import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { changePostDate, changePostDay } from "../redux/modules/post";

const { RangePicker } = DatePicker;

const Text = () => {
  const dispatch = useDispatch();

  function onChange(_, dateStrings) {
    dispatch(changePostDate(dateStrings)); // [start, end]

    const startDay = moment(dateStrings[0]);
    const endDay = moment(dateStrings[1]);

    const days = moment.duration(endDay.diff(startDay)).asDays() + 1 + "";
    // const startDay = new Date(dateStrings[0]);
    // const firstDay = startDay.getDate();
    // const endDay = new Date(dateStrings[1]);
    // const lastDay = endDay.getDate();
    // const days = lastDay - firstDay + 1 + "";

    dispatch(changePostDay(days));
  }

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={onChange} />
    </Space>
  );
};

export default Text;
