import React from 'react';
import '@chatui/core/es/styles/index.less';
import '@chatui/core/dist/index.css';
import UserPic from '../../images/user.svg'
import Chat, { Bubble, useMessages } from '@chatui/core';

const initialMessages = [
  {
    type: 'text',
    content: { text: '你好请问有什么可以帮助你' },
    user: { avatar: UserPic },
  }
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: 'message',
    name: '单词解析',
    isNew: true,
    isHighlight: true,
  }
];

const ChatToLLMComponent = () => {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  // 发送回调
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        user: { avatar: UserPic },
        position: 'right',
      });

      setTyping(true);

      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          user: { avatar: UserPic },
          content: { text: '亲，您遇到什么问题啦？请简要描述您的问题~' },
        });
      }, 1000);
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
}

export default ChatToLLMComponent;