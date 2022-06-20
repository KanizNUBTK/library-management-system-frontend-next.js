import { Calendar } from 'antd';

const Calender = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div className="w-auto rounded-xl bg-cyan-50">
      <Calendar className="w-auto rounded-xl bg-cyan-50" fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
};

export default Calender;