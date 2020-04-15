import {PROD_SERVER, STAGE_SERVER, TEST_SERVER} from "../config/urls";

export function getServerUrl(env) {
  let result = ''
  switch (env) {
    case 'development':
      result = TEST_SERVER
      break
    case 'stage':
      result = STAGE_SERVER
      break
    case 'production':
      result = PROD_SERVER
      break
    case undefined:
      result = TEST_SERVER
      break
    default:
      result = TEST_SERVER
      break
  }
  return result
}
