// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "../../../utils/utils.types"
import { NotificationData, PrettifiedUserInfoData, RawUserInfoData, SendNotificationToUser_NotificationData, UserThumbnailData } from "./users.types"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "Users", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const sendNotificationToUser_formatParameters = (params: Record<string, string>) => {
  const formattedParams: Record<string, { stringValue: string }> = {}
  Object.entries(params).forEach(([ key, value ]) => formattedParams[key] = ({ stringValue: value }))
  return formattedParams
}
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information about a user from their id.
 * @endpoint GET /v2/users/{userId}
 * 
 * @param userId The id of the user to get detailed info about.
 * 
 * @example const { data:userInfo } = await UsersApi.userInfo({ userId: 45348281 });
 * @exampleData {"path":"users/45348281","createTime":"2013-07-13T07:50:00.083Z","id":"45348281","name":"MightyPart","displayName":"Mighty","about":"football nothing to is push sudden national","locale":"en_us","premium":true,"idVerified":true,"socialNetworkProfiles":{"visibility":"EVERYONE"}}
 * @exampleRawBody {"path":"users/45348281","createTime":"2013-07-13T07:50:00.083Z","id":"45348281","name":"MightyPart","displayName":"Mighty","about":"football nothing to is push sudden national","locale":"en_us","premium":true,"idVerified":true,"socialNetworkProfiles":{"facebook":"","twitter":"","youtube":"","twitch":"","guilded":"","visibility":"EVERYONE"}}
 */
export const userInfo = addApiMethod(async <UserId extends Identifier>(
  { userId }: { userId: UserId }
): ApiMethod<RawUserInfoData<UserId>, PrettifiedUserInfoData<UserId>> => ({
  path: `/v2/users/${userId}`,
  method: "GET",
  name: "userInfo",

  prettifyFn: (rawData) => cloneAndMutateObject<RawUserInfoData<UserId>, PrettifiedUserInfoData<UserId>>(rawData, obj => {
    const socialNetworkProfiles = obj.socialNetworkProfiles 
    if (socialNetworkProfiles) {
      Object.entries(socialNetworkProfiles).forEach(([ key, value ]) => {
        if (value != "") return
        delete socialNetworkProfiles[key as keyof typeof socialNetworkProfiles]
      })
    }
    obj.createTime = new Date(obj.createTime)
  })
}))

/**
 * Gets a users avatar.
 * @endpoint GET /v2/users/{userId}:generateThumbnail
 * 
 * @param userId The id of the user to get the thumbnail for.
 * @param size The size of the thumbnail to be returned.
 * @param format The format of the thumbnail to be returned.
 * @param shape The shape of the thumbnail to be returned.
 * 
 * @example const { data:userInfo } = await UsersApi.userInfo({ userId: 45348281 });
 * @exampleData {"path":"users/45348281/operations/eyJOb25jZSI6ImM5ZGZmN2E3OTQ1ZTQxYTc4M2E3OGY4Nzk2ZTYwOTczIiwiVHlwZSI6IkdlbmVyYXRlVXNlclRodW1ibmFpbFJlcXVlc3QiLCJQYXRoIjoidXNlcnMvNDUzNDgyODEiLCJTaXplIjoiMCIsIkZvcm1hdCI6IjAiLCJTaGFwZSI6IjAifQ==","done":true,"response":{"@type":"apis.roblox.com/roblox.open_cloud.cloud.v2.GenerateUserThumbnailResponse","imageUri":"https://tr.rbxcdn.com/30DAY-AvatarHeadshot-8D297BB79DBA963A48A765F78DFC5D1B-Png/420/420/AvatarHeadshot/Png/isCircular"}}
 * @exampleRawBody {"path":"users/45348281/operations/eyJOb25jZSI6ImM5ZGZmN2E3OTQ1ZTQxYTc4M2E3OGY4Nzk2ZTYwOTczIiwiVHlwZSI6IkdlbmVyYXRlVXNlclRodW1ibmFpbFJlcXVlc3QiLCJQYXRoIjoidXNlcnMvNDUzNDgyODEiLCJTaXplIjoiMCIsIkZvcm1hdCI6IjAiLCJTaGFwZSI6IjAifQ==","done":true,"response":{"@type":"apis.roblox.com/roblox.open_cloud.cloud.v2.GenerateUserThumbnailResponse","imageUri":"https://tr.rbxcdn.com/30DAY-AvatarHeadshot-8D297BB79DBA963A48A765F78DFC5D1B-Png/420/420/AvatarHeadshot/Png/isCircular"}}
 */
export const userThumbnail = addApiMethod(async <UserId extends Identifier>(
  { userId, size, format, shape }
  :{ userId: UserId, size?: 48 | 50 | 60 | 75 | 100 | 110 | 150 | 180 | 352 | 420 | 720 | 420, format?: "PNG" | "JPEG", shape?: "ROUND" | "SQUARE" }
): ApiMethod<UserThumbnailData<UserId>> => ({
  path: `/v2/users/${userId}:generateThumbnail`,
  method: "GET",
  searchParams: { size, format, shape },
  name: "userThumbnail"
}))

/**
 * Sends a notification to a user.
 * @endpoint POST /v2/users/{userId}/notifications
 * 
 * @param userId The id of the user send the notification to.
 * @param universeId The id of the universe to send the notification from.
 * @param notificationData The data of the notification.
 * 
 * @example
 * const { data:notification } = await UsersApi.sendNotificationToUser<Parameters>({
     universeId: 1685831367, userId: 45348281, notificationData: {
       messageId: "f70b6a49-a5e5-a048-b1a4-10f9e930614f",
       parameters: { questsLeft: "15", custom: "lorem ipsum dolor sit amet" },
       launchData: "joined from foobar",
       analyticsCategory: "foobar"
     }
   })
 * @exampleData {"path":"users/45348281/notifications/05268fb7-3a73-4d07-9972-65e7a6063892","id":"05268fb7-3a73-4d07-9972-65e7a6063892"}
 * @exampleRawBody {"path":"users/45348281/notifications/05268fb7-3a73-4d07-9972-65e7a6063892","id":"05268fb7-3a73-4d07-9972-65e7a6063892"}
 */
export const sendNotificationToUser = addApiMethod(async <Parameters extends string>(
  { userId, universeId, notificationData }:
  { userId: Identifier, universeId: Identifier, notificationData: SendNotificationToUser_NotificationData<Parameters> }
): ApiMethod<NotificationData<Identifier>> => ({
  path: `/v2/users/${userId}/notifications`,
  method: "POST",
  body: {
    source: { universe: `universes/${universeId}` },
    payload: {
      type: "MOMENT",
      messageId: notificationData.messageId,
      parameters: sendNotificationToUser_formatParameters(notificationData.parameters),
      joinExperience: { launchData: notificationData.launchData },
      analyticsData: { category: notificationData.analyticsCategory }
    }
  },
  name: "sendNotificationToUser"
}))