import {db} from "@/lib/db"

const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
  // Try to find conversation in both orders
  let conversation = await findConversation(memberOneId, memberTwoId) || 
                     await findConversation(memberTwoId, memberOneId)

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId)
  }

  return conversation
}


const findConversation = async (memberOneId: string, memberTwoId: string) => {
   
        return await db.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberOneId },
                    { memberTwoId: memberTwoId },
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
            }
          },
          memberTwo: {
              include: {
                  profile: true,
                }
            }
        }
    })

}

const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
  
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    }
                },
                memberTwo: {
                    include: {
                        profile: true,
                    }
                }
            }
        })
    
}

export { findConversation, createNewConversation, getOrCreateConversation }