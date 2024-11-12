```mermaid
classDiagram
    class Message {
        +number id
        +string text
        +string? sender
        +Date? timestamp
    }

    class MessagesContextType {
        +boolean loading
        +Error? error
        +Message[] messages
        +function addNewMessage
        +string? chatId
    }

    class MessagesProviderProps {
        +ReactNode? children
        +string? chatId
        +Message[]? initialMessages
    }

    class MessageListProps {
        +Message[] messages
        +boolean loading
        +Error? error
        +string channelName
    }

    class MessagesProvider {
        +useState messages
        +function addNewMessage
    }

    class MessageList {
        +renders messages
        +uses MessagesContext
    }

    class MessagesPage {
        +useState messages
        +useState loading
        +useState error
    }

    Message --* MessagesContextType : contains[]
    Message --* MessageListProps : contains[]
    MessagesProvider ..|> MessagesContextType : implements
    MessagesProvider --* MessagesProviderProps : uses
    MessageList --* MessageListProps : uses
    MessageList --> MessagesContextType : consumes
    MessagesPage --> MessageList : renders
    MessagesPage --> Message : manages[]
```
