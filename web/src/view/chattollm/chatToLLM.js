import React from 'react';
import '@chatui/core/es/styles/index.less';
import '@chatui/core/dist/index.css';
import '../../css/chatui-theme.css';
import UserPic from '../../images/user.svg'
import Chat, { Bubble, useMessages } from '@chatui/core';
import { chatWithLLM } from '../../utils/fetchToLLM';
import ShowLLMMsg from '../../components/showmsg';

const initialMessages = [
  {
    type: 'text',
    content: { text: '你好，当前对接的时deepseek商用大模型' },
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
  const { messages, appendMsg, updateMsg, setTyping } = useMessages(initialMessages);

  // 发送回调
  function handleSend(type, val) {
    let sedMessage = val.trim();
    if (type === 'text' && val.trim()) {
      chatWithLLM(sedMessage,"deepseek",appendMsg,updateMsg,setTyping)
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item) {
    //handleSend('text', item.name);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'llm':
        return <ShowLLMMsg content={content.text} />;
      default:
        return <ShowLLMMsg content={content.text} />;
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