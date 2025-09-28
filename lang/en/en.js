class MessageCatalog 
{
    getGreetingTemplate()
    {
        return "Hello %1, What a beautiful day. Server current date and time is %2";
    }
}

module.exports = MessageCatalog;