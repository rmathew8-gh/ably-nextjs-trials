import * as Ably from 'ably';
import { TextEncoder, TextDecoder } from 'util';

describe('Ably REST API Integration Tests', () => {
  let rest: Ably.Rest;
  
  beforeAll(() => {
    // Initialize the Ably REST client with your API key
    rest = new Ably.Rest({
      key: 'YOUR-API-KEY', // Replace with your actual API key
    });
  });

  test('should be able to fetch a list of channels', async () => {
    // Fetch the list of active channels
    const channelsResult = await new Promise<Ably.Types.ChannelDetails[]>((resolve, reject) => {
      rest.channels.get((err, channels) => {
        if (err) reject(err);
        else resolve(channels as Ably.Types.ChannelDetails[]);
      });
    });

    // Assertions
    expect(channelsResult).toBeDefined();
    expect(Array.isArray(channelsResult)).toBe(true);
    
    // Log the channel names
    console.log('Active channels:');
    channelsResult.forEach(channel => {
      console.log(`- ${channel.channelId}`);
    });
  });
});
