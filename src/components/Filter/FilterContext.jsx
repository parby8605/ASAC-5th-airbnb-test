import React, { createContext, useState, useEffect } from 'react'

const FilterContext = createContext()

const FilterProvider = ({ children }) => {
  const initialFilters = {
    roomType: 'all',
    data: [],
    filteredData: [],
    priceRange: { min: 14000, max: 580000 + '+' },
    bedrooms: { 침실: '상관없음', 침대: '상관없음', 욕실: '상관없음' },
    statement: '방, 집 전체 등 원하는 숙소 유형을 검색해 보세요.',
  }

  const [filters, setFilters] = useState(initialFilters)

  const fetchRoomData = async () => {
    try {
      const response = await fetch('/roomDetail.json') // JSON 파일
      const data = await response.json()
      setFilters((prev) => ({ ...prev, data }))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const filterData = (data, roomType, bedrooms, priceRange) => {
    const filteredData = data.filter((item) => {
      const matchesRoomType = roomType === 'all' || item.roomType === roomType
      const matchesBedrooms =
        bedrooms['침실'] === '상관없음' || item.filter.bedRooms == bedrooms['침실']
      const matchesBeds = bedrooms['침대'] === '상관없음' || item.filter.beds == bedrooms['침대']
      const matchesBathrooms =
        bedrooms['욕실'] === '상관없음' || item.filter.bathRooms == bedrooms['욕실']
      const matchesPrice =
        item.price >= priceRange.min && item.price <= parseInt(priceRange.max.replace('+', ''), 10) // 가격 필터링 추가
      return matchesRoomType && matchesBedrooms && matchesBeds && matchesBathrooms
    })
    console.log(`필터링된 데이터:`, filteredData)
    return filteredData
  }

  useEffect(() => {
    fetchRoomData()
  }, [])

  useEffect(() => {
    const filteredData = filterData(
      filters.data,
      filters.roomType,
      filters.bedrooms,
      filters.priceRange,
    )
    setFilters((prev) => ({ ...prev, filteredData }))
  }, [filters.roomType, filters.bedrooms, filters.priceRange, filters.data])

  const handleRoomTypeChange = (type) => {
    const statement = {
      all: '방, 집 전체 등 원하는 숙소 유형을 검색해 보세요.',
      room: '단독으로 사용하는 방이 있고, 공용 공간도 있는 형태입니다.',
      house: '집 전체를 단독으로 사용합니다.',
    }
    setFilters((prev) => ({ ...prev, roomType: type, statement: statement[type] }))
  }

  const handlePriceChange = (range) => {
    setFilters((prev) => ({ ...prev, priceRange: range }))
  }

  const handleBedroomChange = (bedrooms) => {
    setFilters((prev) => ({ ...prev, bedrooms }))
  }

  const handleResetFilters = () => {
    const newFilters = {
      roomType: 'all',
      bedrooms: { 침실: '상관없음', 침대: '상관없음', 욕실: '상관없음' },
      statement: '방, 집 전체 등 원하는 숙소 유형을 검색해 보세요.',
    }
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      filteredData: filterData(prev.data, newFilters.roomType, newFilters.bedrooms),
    }))
  }

  const applyFilters = () => {
    // applyFilters 함수 추가
    const filteredData = filterData(
      filters.data,
      filters.roomType,
      filters.bedrooms,
      filters.priceRange,
    ) // priceRange 추가
    console.log('적용된 필터 데이터:', filteredData)
    return filteredData
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        handleRoomTypeChange,
        handlePriceChange,
        handleBedroomChange,
        handleResetFilters,
        applyFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export { FilterProvider, FilterContext }
