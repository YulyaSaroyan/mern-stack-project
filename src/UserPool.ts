import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: 'us-east-1_fwPB84Hew',
    ClientId: '4rkapdhau19agj7uphq8o59rj0'
}

export default new CognitoUserPool(poolData)