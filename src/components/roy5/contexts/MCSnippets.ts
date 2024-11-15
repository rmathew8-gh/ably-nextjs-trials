import * as Ably from "ably";

const URL = "/channels";
const client = new Ably.Realtime(
  "EMQ9Tw.HHx6Qw:Zq5gDfhVD9_Ovdv_VlZATtQ00l53iQEsuoTDvO2HgaE",
);

async function initializeAuth() {
  const requestData = await client.auth.createTokenRequest({
    clientId: String("roy"),
  });
  console.log("Initialized auth:", requestData);
  return requestData;
}

function handleChannelResponse(
  err: Ably.ErrorInfo | null,
  response: Ably.HttpPaginatedResponse,
) {
  if (err) {
    console.error("Error fetching channels:", err);
    return;
  }
  console.log("Channels:", response);
}

async function fetchChannels() {
  try {
    const result = await client.request(
      "get",
      URL,
      100,
      null,
      null,
      handleChannelResponse,
    );
    console.log(`Fetched (${result.items.length}) channels:`);
    result.items.forEach((channel) =>
      console.log(` - Channel name: ${channel.name}`),
    );

    return result;
  } catch (error) {
    console.error("Error invoking fetchChannels:", error);
    throw error;
  }
}

async function createChannel(channelName: string) {
  try {
    // Get the channel instance
    const channel = client.channels.get(channelName);

    // Attach to the channel to ensure it's created in Ably's system
    await channel.attach();

    console.log(`Created and attached to channel: ${channelName}`);
    return channel;
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error;
  }
}

async function initialize() {
  try {
    const authResult = await initializeAuth();
    const channel = await createChannel("roy-channel");
    const channels = await fetchChannels();
    // Close the connection when done
    client.close();
  } catch (error) {
    console.error("Failed during initialization:", error);
    client.close();
  }
}

initialize();
