import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useCallback } from "react";

export const useFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // parse query + memo lại
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return Object.fromEntries(
      [...params.entries()].map(([key, value]) => [
        key,
        isNaN(value) ? value : Number(value)
      ])
    );
  }, [location.search]);

  // update URL (không bị tạo mới function)
  const setFilters = useCallback((newValues) => {
    const params = new URLSearchParams(location.search);

    Object.entries(newValues).forEach(([key, value]) => {
      if (value != null && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    navigate(`?${params.toString()}`);
  }, [location.search, navigate]);

  //  clear riêng từng loại
  const clearPrice = useCallback(() => {
    setFilters({
      priceMin: null,
      priceMax: null
    });
  }, [setFilters]);

  const clearArea = useCallback(() => {
    setFilters({
      areaMin: null,
      areaMax: null
    });
  }, [setFilters]);

  return {
    query,
    setFilters,
    clearPrice,
    clearArea
  };
};