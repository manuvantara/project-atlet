import { useNavigation } from '@react-navigation/native';
import { differenceInSeconds, format } from 'date-fns';
import { View } from 'react-native';
import {
  Button,
  Divider,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { useSelectedSession } from '../stores/selectedSession.store';
import type { Session } from '../types/session';
import { shareFile } from '../utils/SessionsLocalService';

interface SessionCardProps {
  session: Session;
  fileUris: {
    sessionFileUri: string;
    sensorReadingsFileUri: string;
  };
}

export default function SessionCard({ session, fileUris }: SessionCardProps) {
  const navigation = useNavigation();

  const setSelectedSessionFileUris = useSelectedSession(
    (state) => state.setSessionFileUris
  );

  const shareSession = async (fileUri: string) => {
    await shareFile(fileUri);
  };

  const handleSessionPress = async (fileUris: SessionCardProps['fileUris']) => {
    setSelectedSessionFileUris(fileUris);

    navigation.navigate('TabNavigator', {
      screen: 'History',
      params: {
        screen: 'SessionViewScreen',
      },
    });
  };

  const sessionDurationInSeconds = session.destroyedAt
    ? differenceInSeconds(
        new Date(session.destroyedAt),
        new Date(session.createdAt)
      )
    : 0;

  return (
    <View className='flex-1 rounded-md overflow-hidden'>
      {/* Need to add that view, otherwise border radius is not applying */}
      <Surface className='flex-1 overflow-hidden' elevation={4}>
        {/* Ripple wouldn't work if view has any background color or elevation */}
        <TouchableRipple onPress={() => handleSessionPress(fileUris)}>
          <View className='p-6 gap-4'>
            <View className='flex-row justify-between items-center'>
              <Text variant='titleSmall'>{session.sessionId}</Text>
              <Text>{format(new Date(session.createdAt), 'MMMM d, p')}</Text>
            </View>
            <View className='flex-row justify-between items-center'>
              <Text variant='titleSmall'>Session Duration</Text>
              <Text>
                {format(sessionDurationInSeconds * 1000, 'mm:ss')} min
              </Text>
            </View>
            <Divider bold />
            <View>
              <Text className='mb-4' variant='titleMedium'>
                Session Files
              </Text>
              <View className='flex flex-row justify-between items-center'>
                <Button
                  onPress={() => shareSession(fileUris.sessionFileUri)}
                  mode='contained-tonal'
                  compact
                  icon='share'
                >
                  session.json
                </Button>
                <Button
                  onPress={() => shareSession(fileUris.sensorReadingsFileUri)}
                  mode='contained-tonal'
                  compact
                  icon='share'
                >
                  readings.csv
                </Button>
              </View>
            </View>
          </View>
        </TouchableRipple>
      </Surface>
    </View>
  );
}
