import Amplify from 'aws-amplify';

export const awsConfig = Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:e1b0cd5c-d635-41bc-9814-ce08f0dda76f',
    userPoolWebClientId: '3n1f8lk4hvbcg1obtmic8f5k3h',
    userPoolId: 'us-east-1_578tPb54z',
    region: 'us-east-1',
  },
});
