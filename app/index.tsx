import React, {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, Text} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



export default function Main(){
  const testID = "myCalendar";
  //오늘의 일자

    //dots의 color는 필수. selectedColor와 key는 옵션
    //key가 누락된다면, 배열의 index가 key로 사용됨. 즉, dots: [vacation, message]라면 vacation , message는 0, 1이됨 
    //selectedColor가 누락된다면 color가 selected dates가 된다.
  const vacation = {key: 'vacation', color: 'black', seletedDotColor: 'green'}
  const message = {key: 'message', color: 'blue', selectedDotColor: 'yellow'}
  const workout = {key: 'workout', color: 'green'}

  const dateObg = new Date();
  const year = dateObg.getFullYear();
  const month = dateObg.getMonth()+1;
  const day = dateObg.getDate();
  const fullDate = `${year}-${month}-${day}`;
  // console.log(fullDate);

  // AsyncStorage.setItem();

  useEffect(() => {
    console.log(markedDates);
  }, [markedDateList])

  const [markedDateList, setMarkedDateList] = useState({});

  const [markedDates, setMarkedDates] = useState({
    '2024-10-15': { dots: [vacation, message], selected: true, marked: true },
    '2024-10-18': { marked: true, dots: [{ color: 'green'}] },
    '2024-10-11': { dots:[workout, vacation], marked: true},
    '2024-10-13': { disabled: true, disableTouchEvent: true },
    '2024-10-14': { marked: true, dots: [{ color: 'red'}] },
    '2024-10-03': { marked: true, dots: [{ color: 'red'}]},
  });

  const load = async (uploadDate) => {
    
    try {
      const jStrDate = JSON.stringify(uploadDate);
      await AsyncStorage.setItem('@markedDate', jStrDate); //반환값이 없기 때문에 try catch로  
      console.log('asyncStrong setItem success');
    } catch (error) {
      console.error('setItemError', error);
    }
  }

  // load(markedDates);
  //비동기 함수에는 await가 필요하다.

  const dateObj = {};

  const markedDown = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const date = await AsyncStorage.multiGet(keys); //
      date.forEach(([key, value]) => { // forEach는 return이 없음 > map 사용하여 캘린더에 입력하기
        dateObj[key] = JSON.parse(value);
      });
      console.log(dateObj); //가져온걸 이제 calendar에 입력해야함. 내가 하고자 하는 것은 값을 입력하는 것
    } catch (error) {
      console.error('markedDownError: ', error);
    }
  }

  const gogo = async () => {
    await markedDown();
  }

  gogo();
  



  const picker = (date) => {
    setCurrentPickDate(date);
    const obg = {
      [date.dateString] : { selected:true, selectedColor: 'blue'}
    }
    setMarkedDateList(obg);
    // console.log(markedDateList)
  }

    return(
        <Calendar
        testId={testID}
        markingType={'multi-period'} //multi-dot, period, multi-period
        markedDates={markedDates}
  // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={`${year}년 ${month}월`}
  // // Initially visible month. Default = now
        initialDate={fullDate}
  // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  // minDate={''}
  // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  // maxDate={''}
  // // Handler which gets executed on day press. Default = undefined
  // onDayPress={day => {
  //   // console.log('selected day', day);
  //   picker(day);
  // }}
  // // Handler which gets executed on day long press. Default = undefined
  // onDayLongPress={day => {
  //   console.log('selected day', day);
  // }}

  // // Handler which gets executed when visible month changes in calendar. Default = undefined
  // onMonthChange={month => {
  //   console.log('month changed', month);
  // }}
  // // Hide month navigation arrows. Default = false
  // hideArrows={true}
  // // Replace default arrows with custom ones (direction can be 'left' or 'right')
  // renderArrow={direction => <Arrow />}
  // // Do not show days of other months in month page. Default = false
  // hideExtraDays={true}
  // // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
  // // day from another month that is visible in calendar page. Default = false
  // disableMonthChange={true}
  // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
  // firstDay={1}
  // // Hide day names. Default = false
  // hideDayNames={false}
  // // Show week numbers to the left. Default = false
  // showWeekNumbers={false}
  // // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  // onPressArrowLeft={subtractMonth => subtractMonth()}
  // // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  // onPressArrowRight={addMonth => addMonth()}
  // // Disable left arrow. Default = false
  // disableArrowLeft={true}
  // // Disable right arrow. Default = false
  // disableArrowRight={true}
  // // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  // disableAllTouchEventsForDisabledDays={true}
  // // Replace default month and year title with custom one. the function receive a date as parameter
  // renderHeader={date => {
  //   /*Return JSX*/
  // }}
  // // Enable the option to swipe between months. Default = false
  // enableSwipeMonths={true}
    />
    )
}