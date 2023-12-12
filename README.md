# Spending Tracker
![Spending Tracker Feature Graphic](https://github.com/Jen999/spending-tracker/assets/82018183/26fd2f4f-249c-4fcc-9fd0-69ae7e65b0ce)

This repository is part of the source code of Spending Tracker.

## About
Spending Tracker is a personal finance app designed to make budgetting and tracking of habitual expenses convenient and efficient, with the goal of empowering users to take control, make informed decisions, and build a secure financial future.

<img width="945" alt="image" src="https://github.com/Jen999/spending-tracker/assets/82018183/d9d193aa-8969-495a-8ee7-8518eef6fc55">

#### Tailored Solutions
+ Address your specific spending challenges by customizing the app to focus on your unique financial goal.
+ Maximize your progress by focusing your efforts on one goal at a time. 
#### Seamless Tracking
+ Effortlessly monitor your expenditures on shopping, daily indulgences, or tech splurges with our user-friendly interface.
#### Financial Awareness and Insights
+ Combat the pitfalls of routine spending and convenience culture.
+ Gain insights into your habits and make informed decisions.
#### Cultivate Responsible Habits
+ Break free from the cycle of unhealthy spending by fostering a mindful approach to your finances.
+ Overcome your unhealthy spending habits one after another.

## Installation
Install the application (.apk) file **'Spending-Tracker.apk'** from the above repository onto your mobile device (Android).

The application uses Firestore Database but the configurations have been removed from the repository due to security purposes.
If you would like to use your personal database, follow these steps:
1. Download repository to your device.
2. Create a folder 'Firebase' in the root folder of the source code.
3. Create a file 'firebase.js' in the above Firebase folder with the contents:
```
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
// Enter your firebase configurations below
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore();
```
4. Build your code following https://docs.expo.dev/build/setup/ for your personal use.

## Privacy Policy
Spending Tracker is built as a Free app, and this Service is provided at no cost and is intended for use as is. This is to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service. If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information collected will not be disclosed or shared with anyone, and will only be used as a means of account authentication.
#### Security
I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
#### Children’s Privacy
These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13 years of age. In the case I discover that a child under 13 has provided me with personal information, I will immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do the necessary actions.
#### Changes to This Privacy Policy
I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.
This policy is effective as of 2023-12-09.
