import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faBoxes, faQrcode, faChartLine,  faInfoCircle} from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const savedIndex = localStorage.getItem('activeIndex');
  const [activeIndex, setActiveIndex] = useState(savedIndex ? parseInt(savedIndex) : 0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const buttonsRef = useRef([]);

  const updateIndicatorPosition = useCallback(() => {
    if (buttonsRef.current[activeIndex]) {
      const buttonPosition = buttonsRef.current[activeIndex].getBoundingClientRect();
      setIndicatorPosition(buttonPosition.left);
    }
  }, [activeIndex]);

  const handleClick = (index) => {
    setActiveIndex(index);
    setHasClicked(true);
  };

  useLayoutEffect(() => {
    localStorage.setItem('activeIndex', activeIndex);
    updateIndicatorPosition();

    const handleResize = () => {
      updateIndicatorPosition();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  
  }, [activeIndex, updateIndicatorPosition]);

  const buttons = [
    { text: 'Produk', path: '/', icon: faShoppingBasket },
    { text: 'Grup', path: '/grup', icon: faBoxes },
    { text: 'Scanner', path: '/scanner', icon: faQrcode },
    { text: 'Laporan', path: '/laporan', icon: faChartLine },
    { text: 'Info', path: '/info', icon: faInfoCircle },
  ];

  return (
    <footer className="footer">
      <div className="navigation">
        <div className="wrapper">
          {buttons.map((button, index) => (
            <Link
              key={button.name}
              to={button.path}
              className={`list ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            >
              <button ref={el => buttonsRef.current[index] = el} className="link-button">
                <span className={`icon ${ activeIndex === index ? 'active-icon' : '' }`}><FontAwesomeIcon icon={button.icon} /></span>
                <span className="text">{button.text}</span>
                <span className="circle"></span>
              </button>
            </Link>
          ))}
          <div className="indicator"style={{ left: `${indicatorPosition}px`, transition: hasClicked ? '0.5s' : 'none' }}></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

//   return (
//     <footer className="footer">
//       <Link to="/"><button className="produk-button">Produk</button></Link>
//       <Link to="/grup"><button className="grup-button">Grup</button></Link>
//       <Link to="/scanner"><button className="scan-button">SCAN</button></Link>
//       <Link to="/laporan"><button className="laporan-button">Laporan</button></Link>
//       <Link to="/info"><button className="info-button">Info</button></Link>
//     </footer>
//   );
// }

// export default Footer;
