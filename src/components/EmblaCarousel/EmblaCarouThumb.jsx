import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const GalleryContext = createContext();

export default function EmblaCarouThumb({ children, loop = true }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Khởi tạo Embla cho ảnh lớn
  const [mainRef, mainApi] = useEmblaCarousel({ loop });
  
  // Khởi tạo Embla cho ảnh nhỏ (thumbnails)
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => mainApi && mainApi.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi && mainApi.scrollNext(), [mainApi]);

  const scrollTo = useCallback(
    (index) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi.scrollTo(index); // Tự động cuộn thanh thumbnail theo ảnh lớn
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);
  }, [mainApi, onSelect]);

  const childrenArray = React.Children.toArray(children);
  const mainContent = childrenArray.find((child) => child.type === EmblaCarouThumb.Main);
  const thumbContent = childrenArray.find((child) => child.type === EmblaCarouThumb.Thumbs);

  return (
    <GalleryContext.Provider value={{ selectedIndex, scrollTo }}>
      <GalleryContainer>
        {/* 1. KHU VỰC ẢNH LỚN & MŨI TÊN ĐIỀU HƯỚNG */}
        <MainCarouselWrapper>
          <Viewport ref={mainRef}>
            <Container>{mainContent}</Container>
          </Viewport>
          <NavButton className="prev" onClick={scrollPrev} aria-label="Previous slide">
            <LeftOutlined />
          </NavButton>
          <NavButton className="next" onClick={scrollNext} aria-label="Next slide">
            <RightOutlined />
          </NavButton>
        </MainCarouselWrapper>

        {/* 2. KHU VỰC THUMBNAILS BÊN DƯỚI */}
        {thumbContent && (
          <ThumbCarouselWrapper ref={thumbRef}>
            <Container style={{ gap: '8px' }}>{thumbContent}</Container>
          </ThumbCarouselWrapper>
        )}
      </GalleryContainer>
    </GalleryContext.Provider>
  );
}

EmblaCarouThumb.Item = function GalleryItem({ children }) {
  return (
    <Slide>
      <ImageWrapper>{children}</ImageWrapper>
    </Slide>
  );
};

EmblaCarouThumb.Main = function GalleryMain({ children }) {
  return <>{children}</>;
};

EmblaCarouThumb.Thumbs = function GalleryThumbs({ children }) {
  const { selectedIndex, scrollTo } = useContext(GalleryContext);
  const items = React.Children.toArray(children);

  return (
    <>
      {items.map((child, index) => {
        const isSelected = index === selectedIndex;
        return (
          <ThumbSlide key={index}>
            <ThumbButton $active={isSelected} onClick={() => scrollTo(index)}>
              {child}
            </ThumbButton>
          </ThumbSlide>
        );
      })}
    </>
  );
};

/* --- STYLED COMPONENTS --- */

// 1. Thay đổi GalleryContainer để nó tự bám full 100% theo thằng cha (Col) và không bị tràn
const GalleryContainer = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  box-sizing: border-box; /* Cực kỳ quan trọng để padding không làm tràn width */
  overflow: hidden;      /* Ngăn chặn mọi phần tử con tràn ra ngoài khung */
`;

const MainCarouselWrapper = styled.div`
  position: relative;
  &:hover button {
    opacity: 1;
  }
`;

// 2. Đảm bảo khung chứa ảnh lớn bám sát 100% width của container
const Viewport = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

const Container = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
`;

const Slide = styled.div`
  position: relative;
  min-width: 100%;
  flex: 0 0 100%;
`;

// 3. Ràng buộc tuyệt đối thẻ img lớn không bao giờ bị vượt quá khung chứa
const ImageWrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: #1f2937;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  opacity: 0.9;
  z-index: 10;

  &:hover {
    background: #ffffff;
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &.prev {
    left: 12px;
  }

  &.next {
    right: 12px;
  }
`;

const ThumbCarouselWrapper = styled.div`
  margin-top: 12px;
  overflow: hidden; /* Cực kỳ quan trọng để ẩn các tấm ảnh thừa ngoài khung nhìn */
  padding: 4px 0;
`;

const ThumbSlide = styled.div`
  /* Mặc định trên máy tính / iPad: Hiển thị khoảng 6 tấm cùng lúc */
  flex: 0 0 16.666%; 
  min-width: 0;

  /* Riêng trên điện thoại (màn hình <= 640px): Bắt buộc chỉ hiển thị ĐÚNG 2 TẤM (chiếm 50% mỗi tấm) */
  @media (max-width: 640px) {
    flex: 0 0 50%; 
  }
`;

// 4. Ràng buộc cho các ảnh thumbnail phía dưới luôn co giãn đều đặn theo khung
const ThumbButton = styled.button`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  background: #f9fafb;
  transition: all 0.2s ease;
  border: 2px solid ${(props) => (props.$active ? '#000000' : 'transparent')};
  opacity: ${(props) => (props.$active ? '1' : '0.6')};
  transform: ${(props) => (props.$active ? 'scale(0.98)' : 'scale(1)')};

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;