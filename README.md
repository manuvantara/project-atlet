# Turborepo react-native starter

This is an official starter Turborepo.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `native`: a [react-native](https://reactnative.dev/) app built with [expo](https://docs.expo.dev/)
- `web`: a [Next.js](https://nextjs.org/) app built with [react-native-web](https://necolas.github.io/react-native-web/)
- `ui`: a stub [react-native](https://reactnative.dev/) component library shared by both `web` and `native` applications
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [Expo](https://docs.expo.dev/) for native development
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting

## Using this example

Run the following command:

```sh
npx degit vercel/turbo/examples/with-react-native-web with-react-native-web
cd with-react-native-web
yarn install
git init . && git add . && git commit -m "Init"
```


## (Unauthorized)
- Login Screen => Home Screen

## (Authorised Using Private Key) Screens:
- Home Screen (default) => Tasks Screen
- Tasks Screen <=> Selected Task Confirmation Screen => Session Screen (createSession, destroySession) =confirmation=> Session Summary Screen => Session History Screen
- Session History Screen <=> Session View Screen
- Settings Screen => Login Screen


### Welcome Screen 
- Hearder "Welcome!"
- Input privateKey

### Home Screen
- Header Hello, ${wallet.address()} @position=Positions.center-middle
- Button "Start a session!" @link=<Tasks Screen />

### Tasks Screen
- Header "Tasks To-Do" @position=Positions.top-left
- Subheader "Complete the tasks and make a contribution the first lifestyle metaverse!"
- TaskList <TaskListItem> --task-name

  
  
### Other
```typescript

enum ActivityTypes = "CYCLING";
enum OperatingSystemTypes = "ANDROID" | "IOS";  
  
// ChatGPT 
// https://badcyclist.ca/how-to-carry-your-phone-while-cycling/#bikespecific-phone-case
// https://zizebikes.com/where-do-you-put-your-smartphone-when-you-ride/
enum SmartphonePositions = "HANDLEBAR" | "HANDLEBAR_BAG" | "HANDLEBAR_AND_PLASTIC_BAG" | "FRAME_BAG" | "BASKET" | "BACKPACK" | "SHORTS_POCKET" | "JERSEY_POCKET" | "ARMBAND" | "WAISTBAND" | "HAND";
  
// https://www.adventurecycling.org/guided-tours/surface-types/
enum SurfaceTypes = "PAVED" | "DIRT" | "GRAVEL" | "BIKE_TRAIL";  

// https://www.google.com/search?q=bicycle+types&oq=bicycle+types&aqs=chrome..69i57j0i512l2j0i20i263i512j0i512j0i22i30i625j0i15i22i30i625j0i22i30i625l3.5111j0j7&sourceid=chrome&ie=UTF-8
enum BicycleTypes = "MOUNTAIN" | "HYBRID" | "CYCLOCROSS" | "FIXED_GEAR" | "TIME_TRIAL" | "ROAD" | "TOURING" | "TANDAM" | "FATBIKE" | "FOLDING" | "BEACH_CRUISER" | "RECUMBENT" | "CRUISER";
  
  
type CyclingSessionMetadata = {
  activity: ActivityTypes.CYCLING,  
  version: "1.0.0",

  // accountId: string,

  operatingSystem: OperatingSystemTypes.ANDROID,
  smartphoneModel: string, // e.g. Samsung Galaxy S23 Ultra

  smartphonePosition: smartphonePositions,
  
  surface: SyfraceTypes, 
  bicycleType: BicycleTypes,
  isElectric: bool, // e.g. there are folding bicycles as well as electric folding bicycles
  
  // Desired interval in milliseconds between sensor updates
  sensorsUpdateInterval: 16,
};  

type SessionMetadata = CyclingSessionMetadata;
  
type Task = {
  id: number,
  sessionMetadata: SessionMetadata,
};

```
