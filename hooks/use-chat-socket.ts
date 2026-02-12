import { useEffect } from "react";
import { useSocket } from "@/components/providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { Message, Member, Profile } from "@prisma/client";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    // 🔁 UPDATE MESSAGE
    socket.on(
      updateKey,
      (message: MessageWithMemberWithProfile) => {
        queryClient.setQueryData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return oldData;
          }

          const newData = oldData.pages.map((page: any) => {
            return {
              ...page,
              items: page.items.map(
                (item: MessageWithMemberWithProfile) => {
                  if (item.id === message.id) {
                    return message;
                  }
                  return item;
                }
              ),
            };
          });

          return {
            ...oldData,
            pages: newData,
          };
        });
      }
    );

    // ➕ ADD NEW MESSAGE
    socket.on(
      addKey,
      (message: MessageWithMemberWithProfile) => {
        queryClient.setQueryData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return {
              pages: [
                {
                  items: [message],
                },
              ],
            };
          }

          const newData = [...oldData.pages];

          newData[0] = {
            ...newData[0],
            items: [message, ...newData[0].items],
          };

          return {
            ...oldData,
            pages: newData,
          };
        });
      }
    );

    // 🧹 CLEANUP
    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [socket, queryClient, addKey, updateKey, queryKey]);
};
