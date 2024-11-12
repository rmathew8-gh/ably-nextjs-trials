import * as Ably from "ably";

const URL = "/channels";
const client = new Ably.Rest(
  "EMQ9Tw.HHx6Qw:Zq5gDfhVD9_Ovdv_VlZATtQ00l53iQEsuoTDvO2HgaE",
);

async function initializeAuth() {
  const requestData = await client.auth.createTokenRequest({
    clientId: String("roy"),
  });
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
    return result;
  } catch (error) {
    console.error("Error invoking fetchChannels:", error);
    throw error;
  }
}

async function initialize() {
  try {
    const authResult = await initializeAuth();
    console.log("Initialized auth:", authResult);

    const channels = await fetchChannels();
    console.log(`Fetched (${channels.items.length}) channels:`);
  } catch (error) {
    console.error("Failed during initialization:", error);
  }
}

initialize();
