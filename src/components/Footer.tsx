import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import axios from 'axios';

export default function Footer() {
  const { t } = useTranslation();
  const config = useAppStore(state => state.config);
  const [oneWord, setOneWord] = useState('Loading...');
  const [cutDownTime, setCutDownTime] = useState(0);
  const year = new Date().getFullYear();

  const getOneWord = async () => {
    try {
      const response = await axios.get('https://v1.hitokoto.cn', {
        params: { encode: 'text' }
      });
      return response.data;
    } catch (error) {
      return 'Failed to load...';
    }
  };

  useEffect(() => {
    getOneWord().then(setOneWord);
  }, []);

  const handleRefresh = () => {
    if (cutDownTime === 0) {
      setCutDownTime(-1);
      setOneWord('Loading...');
      getOneWord().then(result => {
        setOneWord(result);
        setCutDownTime(5);
        const clock = setInterval(() => {
          setCutDownTime(prev => {
            if (prev <= 1) {
              clearInterval(clock);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      });
    }
  };

  return (
    <footer className="text-center text-sm py-8 mt-12">
      <p>
        <a
          onClick={handleRefresh}
          className="text-blue-700 hover:text-blue-900 cursor-pointer select-none"
          title={cutDownTime > 0 ? t('footer.tooltip.wait', { sec: cutDownTime }) : t('footer.tooltip.refresh')}
        >
          {oneWord}
        </a>
      </p>
      <p className="my-4">
        <a href="http://blog.lucien.ink" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
          Lucien's Blog
        </a>
        {config.footer.map((footer, index) => (
          <span key={index}>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href={footer.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
              {footer.text}
            </a>
          </span>
        ))}
      </p>
      <p>
        <span>Copyright&nbsp;&copy;&nbsp;2018&nbsp;-&nbsp;{year}&nbsp;</span>
        <a href="mailto:lucien@lucien.ink" className="text-blue-700 hover:text-blue-900">Lucien&nbsp;Shui</a>
      </p>
      <p className="mt-4" title="赞助商">
        <a
          href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=30tfqka6"
          title="阿里云限量红包，上云就上阿里云，享数字化转型，市场占有率超过第 2-5 名总和"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mx-2"
        >
          <img src="https://cdn.jsdelivr.net/gh/PasteUs/CDN@0.0.11/pasteme/img/aliyun.svg" alt="Aliyun" className="h-8" />
        </a>
        <a
          href="https://www.bt.cn/?invite_code=MV9ibGZqbWs="
          title="宝塔服务器面板，一键全能部署及管理，送你3188元礼包，点我领取"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mx-2"
        >
          <img src="https://www.bt.cn/Public/images/bt_logo.png" alt="BT" className="h-8" />
        </a>
      </p>
    </footer>
  );
}
