// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "../../../utils/utils.types"
import { UserInfoData } from "./oauth.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "Inventory", baseUrl: "https://apis.roblox.com/oauth" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets user information from the current access token.
 * @endpoint GET /v1/userinfo
 * 
 * @example const { data:userInfo } = await OAuthApi.userInfo.bind({ oauthToken: "g3dcga9abegb1aacaag93ea46d5c064g" })()
 * @exampleData {"sub":"45348281","name":"Mighty","nickname":"Mighty","preferred_username":"MightyPart","created_at":1373701800,"profile":"https://www.roblox.com/users/45348281/profile","picture":"https://tr.rbxcdn.com/30DAY-AvatarHeadshot-11BD4BBC67E3F95A4F4BED256CFB4591-Png/150/150/AvatarHeadshot/Png/noFilter"}
 * @exampleRawBody {"sub":"45348281","name":"Mighty","nickname":"Mighty","preferred_username":"MightyPart","created_at":1373701800,"profile":"https://www.roblox.com/users/45348281/profile","picture":"https://tr.rbxcdn.com/30DAY-AvatarHeadshot-11BD4BBC67E3F95A4F4BED256CFB4591-Png/150/150/AvatarHeadshot/Png/noFilter"}
 */
export const userInfo = addApiMethod(async (
): ApiMethod<UserInfoData> => ({
  method: "GET",
  path: `/v1/userinfo`,
  name: `userInfo`,
}))
