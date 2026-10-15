import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const EmblaCarousel = ({ 
  children, 
  options = {},           
  arrowsPosition = 'overlay', 
  showDots = false,        
  slideSpacing = '16px', 
  slidesToShow = { mobile: 1, tablet: 2, desktop: 4 } 
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    ...options
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  
  // Trạng thái kiểm tra khả năng trượt để tự động ẩn/hiện arrow theo responsive
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();

    // Lắng nghe sự kiện co giãn màn hình để Embla tính lại layout card và arrow
    const handleResize = () => {
      emblaApi.reInit();
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [emblaApi, onSelect]);

  // Điều kiện hiển thị mũi tên: Nếu có loop hoặc có thể trượt ít nhất 1 chiều
  const showArrows = options.loop || canScrollPrev || canScrollNext;

  return (
    <Wrapper>
      <Viewport ref={emblaRef}>
        <Container $slideSpacing={slideSpacing}>
          {React.Children.map(children, (child, index) => (
            <Slide key={index} $slidesToShow={slidesToShow}$slideSpacing={slideSpacing}>
              {child}
            </Slide>
          ))}
        </Container>
      </Viewport>

      {/* Hai nút mũi tên điều hướng nổi lên trên ảnh/card và tự ẩn/hiện thông minh */}
      {arrowsPosition === 'overlay' && showArrows && (
        <>
          <OverlayButton 
            className="btn_prev" 
            onClick={scrollPrev} 
            type="button"
            style={{ display: !canScrollPrev && !options.loop ? 'none' : 'flex' }}
          >
            <CaretLeftOutlined />
          </OverlayButton>
          <OverlayButton 
            className="btn_next" 
            onClick={scrollNext} 
            type="button"
            style={{ display: !canScrollNext && !options.loop ? 'none' : 'flex' }}
          >
            <CaretRightOutlined />
          </OverlayButton>
        </>
      )}

      {/* Dấu chấm nhỏ (Dots) */}
      {showDots && scrollSnaps.length > 1 && (
        <DotsWrapper>
          {scrollSnaps.map((_, index) => (
            <Dot
              key={index}
              onClick={() => scrollTo(index)}
              className={index === selectedIndex ? 'is-selected' : ''}
              type="button"
            />
          ))}
        </DotsWrapper>
      )}
    </Wrapper>
  );
};

// ================= STYLED COMPONENTS =================

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  /* Hỗ trợ nhận giá trị 0 hoặc số chuẩn xác */
  gap: ${({ $slideSpacing }) => ($slideSpacing !== undefined && $slideSpacing !== null ? $slideSpacing : '16px')};
  padding-bottom: 12px;
`;

const Slide = styled.div`
  min-width: 0;
  flex-shrink: 0;

  /* Tự động chia kích thước % dựa trên slidesToShow và tính toán gap chính xác */
  ${({ $slidesToShow, $slideSpacing }) => {
    const rawGap = $slideSpacing !== undefined && $slideSpacing !== null ? $slideSpacing : '16px';
    const gap = typeof rawGap === 'number' ? `${rawGap}px` : rawGap;

    if ($slidesToShow === 1 || (typeof $slidesToShow === 'number' && $slidesToShow === 1)) {
      return `flex: 0 0 100%;`;
    }

    if (typeof $slidesToShow === 'number') {
      return `flex: 0 0 calc((100% - (${gap} * (${$slidesToShow} - 1))) / ${$slidesToShow});`;
    }

    const { mobile = 1, tablet = 2, desktop = 4 } = $slidesToShow || {};

    return `
      flex: 0 0 ${mobile === 1 ? '100%' : `calc((100% - (${gap} * (${mobile} - 1))) / ${mobile})`};

      @media (min-width: 768px) {
        flex: 0 0 calc((100% - (${gap} * (${tablet} - 1))) /${tablet});
      }

      @media (min-width: 1024px) {
        flex: 0 0 calc((100% - (${gap} * (${desktop} - 1))) /${desktop});
      }
    `;
  }}
`;

const OverlayButton = styled.button`
  position: absolute;
  top: 50%; /* Nằm ngang tầm phần hình ảnh của card */
  transform: translateY(-50%);
  z-index: 6;
  
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #00bcd4;
    color: #fff;
    transform: translateY(-50%) scale(1.1);
  }

  &.btn_prev {
    left: 10px;
    font-size: 16px;
  }

  &.btn_next {
    right: 10px;
    font-size: 16px;
  }
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #d8d8d8;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;

  &.is-selected {
    background: #00bcd4;
    width: 24px;
    border-radius: 5px;
  }
`;