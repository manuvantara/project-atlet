import * as Device from 'expo-device';
import { Box, FlatList, Heading, HStack, Text, VStack } from 'native-base';
import { TouchableOpacity, View } from 'react-native';

import { useTaskStore } from '../stores/task.store';
import type { ScreenProps } from '../types/navigation';
import type { Task } from '../types/session-metadata';
import {
  ActivityTypes,
  BicycleTypes,
  OperatingSystemTypes,
  SmartphonePositions,
  SurfaceTypes,
} from '../types/session-metadata';

const smartphoneModel = Device.manufacturer + ' ' + Device.modelName;

const tasks: Task[] = [
  {
    taskId: 1,
    accountId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    sessionMetadata: {
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel,
      smartphonePosition: SmartphonePositions.PANTS_POCKET,
      surface: SurfaceTypes.SNOW,
      bicycleType: BicycleTypes.BMX,
      isElectric: false,
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 2,
    accountId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    sessionMetadata: {
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel,
      smartphonePosition: SmartphonePositions.PANTS_POCKET,
      surface: SurfaceTypes.SNOW,
      bicycleType: BicycleTypes.BMX,
      isElectric: false,
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 3,
    accountId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    sessionMetadata: {
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel,
      smartphonePosition: SmartphonePositions.PANTS_POCKET,
      surface: SurfaceTypes.SNOW,
      bicycleType: BicycleTypes.BMX,
      isElectric: false,
      sensorUpdateInterval: 16,
    },
  },
];

export default function TasksScreen({
  navigation,
}: ScreenProps<'TasksScreen'>) {
  const setTasks = useTaskStore((state) => state.setTasks);

  setTasks(tasks);
  const renderTaskListItem = ({ item }: { item: Task }) => {
    return (
      <Box w='100%' className='bg-secondary' rounded='md' p={4} my={2}>
        <TouchableOpacity
          onPress={
            () =>
              navigation.navigate<any>('SelectedTaskConfirmationScreen', {
                taskId: item.taskId,
              }) // TODO: fix this
          }
        >
          <HStack>
            <VStack>
              <Heading size='md'>Task #{item.taskId}</Heading>
              <Text>Activity: {item.sessionMetadata.activity}</Text>
              <Text>Surface: {item.sessionMetadata.surface}</Text>
              <Text>Bicycle type: {item.sessionMetadata.bicycleType}</Text>
              <Text>
                Is electric? {item.sessionMetadata.isElectric ? 'YES' : 'NO'}
              </Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <View className='flex-1 bg-primary h-full justify-center px-4'>
      <Heading size='2xl' className='mb-4'>
        Tasks
      </Heading>
      <Box w='100%' maxW='100%'>
        <FlatList data={tasks} renderItem={renderTaskListItem} />
      </Box>
    </View>
  );
}
