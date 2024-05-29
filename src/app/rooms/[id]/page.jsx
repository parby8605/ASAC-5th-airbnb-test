import Amenities from '@/components/Aments/Amenities'
import DetailPageCalendarDisplay from '@/components/Calendar/DetailPageCalendarDisplay'
import Comment from '@/components/Comment/Comment'
import DetailRoomInfo from '@/components/DetailRoomInfo/DetailRoomInfo'
import Header from '@/components/Header/Header'
import SmallHeader from '@/components/Header/SmallHeader'
import HostIntroduction from '@/components/HostIntroduction/HostIntroduction'
import MainImage from '@/components/MainImage/Mainimage'

export default function roomDetail() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <SmallHeader />
      <MainImage />
      <DetailRoomInfo />
      <Comment />
      <Amenities />
      <DetailPageCalendarDisplay />
      <HostIntroduction />
    </main>
  )
}
