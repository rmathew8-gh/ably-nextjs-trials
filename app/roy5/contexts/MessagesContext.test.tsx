import { render, act } from "@testing-library/react";
import { Realtime } from "ably";
import { MessagesContext } from "./MessagesContext";

const mockContextValue = {
  loading: false,
  error: undefined,
  messages: [],
  addNewMessage: jest.fn(),
  chatId: "test-chat-id",
};

// Mock Ably
jest.mock("ably", () => ({
  Realtime: jest.fn(() => ({
    connection: {
      on: jest.fn(),
      state: "connected",
    },
    channels: {
      get: jest.fn(() => ({
        subscribe: jest.fn(),
        publish: jest.fn(),
        unsubscribe: jest.fn(),
      })),
    },
    close: jest.fn(),
  })),
}));

describe("MessagesContext - Ably Integration", () => {
  let mockAbly: jest.Mocked<Realtime>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    mockAbly = new Realtime({
      authUrl: "/api/createTokenRequest",
      clientId: "your-client-id",
    }) as jest.Mocked<Realtime>;
  });

  it("should initialize Ably with correct config", () => {
    const mockContextValue = {
      loading: false,
      error: undefined,
      messages: [],
      addNewMessage: jest.fn(),
      chatId: "test-chat-id",
    };

    render(
      <MessagesContext.Provider value={mockContextValue}>
        <div>Test Child</div>
      </MessagesContext.Provider>,
    );

    expect(Realtime).toHaveBeenCalledWith({
      authUrl: "/api/createTokenRequest",
      clientId: "your-client-id",
    });
  });

  it("should subscribe to channel on mount", () => {
    const channelName = "your-channel-name";

    render(
      <MessagesContext.Provider value={mockContextValue}>
        <div>Test Child</div>
      </MessagesContext.Provider>,
    );

    const mockChannel = mockAbly.channels.get(channelName);
    expect(mockChannel.subscribe).toHaveBeenCalled();
  });

  it("should unsubscribe and close connection on unmount", () => {
    const { unmount } = render(
      <MessagesContext.Provider value={mockContextValue}>
        <div>Test Child</div>
      </MessagesContext.Provider>,
    );

    unmount();

    const mockChannel = mockAbly.channels.get("your-channel-name");
    expect(mockChannel.unsubscribe).toHaveBeenCalled();
    expect(mockAbly.close).toHaveBeenCalled();
  });

  it("should handle incoming messages", () => {
    const mockMessage = {
      data: { content: "test message" },
    };

    const mockContextValue = {
      loading: false,
      error: undefined,
      messages: [],
      addNewMessage: jest.fn(),
      chatId: "test-chat-id",
    };

    render(
      <MessagesContext.Provider value={mockContextValue}>
        <div>Test Child</div>
      </MessagesContext.Provider>,
    );

    const mockChannel = mockAbly.channels.get("your-channel-name");
    const subscribeCallback = (mockChannel.subscribe as jest.Mock).mock.calls[0][0];

    act(() => {
      subscribeCallback(mockMessage);
    });

    // Add assertions here based on how your context handles messages
    // For example:
    // expect(mockSetMessages).toHaveBeenCalledWith(expect.arrayContaining([mockMessage.data]));
  });

  it("should publish messages to channel", async () => {
    const mockContextValue = {
      loading: false,
      error: undefined,
      messages: [],
      addNewMessage: jest.fn(),
      chatId: "test-chat-id",
    };

    render(
      <MessagesContext.Provider value={mockContextValue}>
        <div>Test Child</div>
      </MessagesContext.Provider>,
    );

    const mockChannel = mockAbly.channels.get("your-channel-name");

    // Assuming you have a method to publish messages, trigger it here
    // await publishMessage('test message');

    expect(mockChannel.publish).toHaveBeenCalledWith("message", {
      content: "test message",
    });
  });
});
