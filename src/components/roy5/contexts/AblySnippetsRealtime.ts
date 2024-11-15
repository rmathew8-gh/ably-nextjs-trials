import * as Ably from "ably";

const CHANNEL_NAME = "h24:default-channel";

const ably = new Ably.Realtime(
  "EMQ9Tw.HHx6Qw:Zq5gDfhVD9_Ovdv_VlZATtQ00l53iQEsuoTDvO2HgaE",
);

async function publishSubscribe() {
  // Connect to Ably with your API key
  ably.connection.once("connected", () => {
    console.log("Connected to Ably!");
  });

  // Create a channel called 'get-started' and register a listener to subscribe to all messages with the name 'first'
  const channel = ably.channels.get(CHANNEL_NAME);
  await channel.subscribe("first", (message) => {
    console.log("Message received: " + message.data);
  });

  // Publish a message with the name 'first' and the contents 'Here is my first message!'
  for (let i = 0; i < 5; i++) {
    let now = Date.now().toString();
    await channel.publish("first", `Here is a message ${now}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Close the connection to Ably after a 5 second delay
  setTimeout(async () => {
    ably.connection.close();
    ably.connection.once("closed", function () {
      console.log("Closed the connection to Ably.");
    });
  }, 1000);
}

async function getChannelHistory(channelName: string) {
  try {
    const channel = ably.channels.get(channelName);
    const history = await channel.history({
      // Optional parameters:
      // start: <timestamp>, // earliest time in ms since epoch
      // end: <timestamp>,   // latest time in ms since epoch
      // limit: 100,         // maximum number of messages (up to 1000)
      // direction: 'backwards' // or 'forwards'
    });

    const messages = history.items;
    // console.log("Channel history:", messages); // very verbose

    // If there are more pages, you can fetch them
    if (history.hasNext()) {
      const nextPage = await history.next();
      console.log("Next page:", nextPage?.items);
    }

    ably.close();

    messages.forEach((msg) => {
      console.log(`${msg.id}: ${msg.data}`);
      // console.log(`Message ID: ${msg.id}: ${msg.data} @ ${msg.timestamp}`);
    });

    return messages;
  } catch (error) {
    console.error("Error fetching channel history:", error);
    throw error;
  }
}

// Example usage with async/await
async function main() {
  try {
    // await publishSubscribe();
    const messages = await getChannelHistory(CHANNEL_NAME);
  } catch (error) {
    console.error("Main error:", error);
  }
}

main();
