import { useCallback, useEffect } from 'react';

import closeImage from '../../imgs/close.svg';

import styles from './Popup.module.css';

const Popup = ({ isOpen, setIsOpen, style, children }) => {
  /**
   * Элемент попапа
   * @param {boolean} isOpen Флаг состояния показа попапа
   * @param {boolean} setIsOpen Коллбек установки состояния показа попапа
   */

  // const [isVisible, setIsVisible] = useState(isOpen);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleCloseByEscape = useCallback((evt) => {
    if (evt.key === 'Escape') {
      closePopup();
    }
  }, []);

  function handleWrapperClick(evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains(styles.popup)) {
      closePopup();
    }
  }

  // Добавляю возможность закрыть попап нажатием Escape
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleCloseByEscape);
    } else {
      window.removeEventListener('keydown', handleCloseByEscape);
    }
  }, [isOpen, handleCloseByEscape]);

  return (
    <div className={[styles.popup, !isOpen && styles.hidden].join(' ')} onClick={handleWrapperClick}>
      <div className={styles.popupContainer} style={style}>
        {children}

        <img src={closeImage} alt="Закрыть, кнопка" className={styles.closeButton} onClick={closePopup} />
      </div>
    </div>
  );
};

export default Popup;
