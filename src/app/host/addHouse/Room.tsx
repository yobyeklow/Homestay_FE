import React, { useEffect, useState } from "react";

const dataRooms = [
  {
    id: 1,
    name: "Khách",
  },
  {
    id: 2,
    name: "Giường",
  },
  {
    id: 3,
    name: "Phòng ngủ",
  },
  {
    id: 4,
    name: "Phòng tắm",
  },
];
interface Room {
  _id?: any;
  count: number;
  name: string;
  type: string;
}

interface DataRoom {
  numberGuests: number;
  bedCount: number;
  room: Room[];
}
interface RoomComponentProps {
  dataRoom: DataRoom;
  setDataRoom: React.Dispatch<React.SetStateAction<DataRoom>>;
}
const Room = ({ dataRoom, setDataRoom }: RoomComponentProps) => {
  const handleUpdateRoom = (index: number, room: any, increase: boolean) => {
    const updateRoom = { ...room };

    if (increase) {
      updateRoom.room[index] = {
        ...updateRoom.room[index],
        count: updateRoom.room[index].count + 1,
      };
    } else {
      updateRoom.room[index] = {
        ...updateRoom.room[index],
        count: updateRoom.room[index].count - 1,
      };
    }
    // console.log(updateRoom);
    setDataRoom(updateRoom);
  };

  return (
    <div className="addRoom w-full px-3 flex flex-col max-h-fit h-full border-[1px] border-gray-300 rounded-lg bg-white">
      {dataRooms?.map((data: any, index: number) => {
        return (
          <div
            key={data.id}
            className="field relative text-base font-semibold text-gray-600 w-full flex justify-between px-2 py-5 items-center"
          >
            <>
              {data.name == "Khách" && (
                <>
                  <span className="text-lg">{data.name}</span>
                  <div className="buttonField flex items-center gap-x-2">
                    <span
                      onClick={() => {
                        setDataRoom({
                          ...dataRoom,
                          numberGuests: dataRoom.numberGuests - 1,
                        });
                      }}
                      className={`${
                        dataRoom.numberGuests == 1
                          ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                          : ""
                      } cursor-pointer border-[1px] border-gray-600 rounded-full px-3 py-1`}
                    >{`<`}</span>
                    <span className="mx-4 ">{dataRoom.numberGuests}</span>
                    <span
                      onClick={() =>
                        setDataRoom({
                          ...dataRoom,
                          numberGuests: dataRoom.numberGuests + 1,
                        })
                      }
                      className="cursor-pointer border-[1px] border-gray-600 rounded-full px-3 py-1"
                    >{`>`}</span>
                  </div>
                </>
              )}
              {data.name == "Giường" && (
                <>
                  <span className="text-lg">{data?.name}</span>
                  <div className="buttonField flex items-center gap-x-2">
                    <span
                      onClick={() => {
                        setDataRoom((prevData: any) => ({
                          ...prevData,
                          bedCount: prevData.bedCount - 1,
                        }));
                      }}
                      className={`${
                        dataRoom?.bedCount == 1
                          ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                          : ""
                      } cursor-pointer border-[1px] border-gray-600 rounded-full px-3 py-1`}
                    >{`<`}</span>
                    <span className="mx-4 ">{dataRoom?.bedCount}</span>
                    <span
                      onClick={() =>
                        setDataRoom((prevData: any) => ({
                          ...prevData,
                          bedCount: prevData.bedCount + 1,
                        }))
                      }
                      className="cursor-pointer border-[1px] border-gray-600 rounded-full px-3 py-1"
                    >{`>`}</span>
                  </div>
                </>
              )}
              {data.name == "Phòng ngủ" && (
                <>
                  <span className="text-lg">{data?.name}</span>
                  <div className="buttonField flex items-center gap-x-2">
                    <span
                      onClick={() => handleUpdateRoom(0, dataRoom, false)}
                      className={`${
                        dataRoom?.room[0]?.count == 1
                          ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                          : ""
                      } cursor-pointer border-[1px] border-gray-600 rounded-full px-3 py-1`}
                    >{`<`}</span>
                    <span className="mx-4 ">{dataRoom?.room[0]?.count}</span>
                    <span
                      onClick={() => handleUpdateRoom(0, dataRoom, true)}
                      className="cursor-pointer border-[1px] border-gray-600 rounded-full px-3 py-1"
                    >{`>`}</span>
                  </div>
                </>
              )}
              {data.name == "Phòng tắm" && (
                <>
                  <span className="text-lg">{data?.name}</span>
                  <div className="buttonField flex items-center gap-x-2">
                    <span
                      onClick={() => handleUpdateRoom(1, dataRoom, false)}
                      className={`${
                        dataRoom?.room[1].count == 1
                          ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                          : ""
                      } cursor-pointer border-[1px] border-gray-600 rounded-full px-3 py-1`}
                    >{`<`}</span>
                    <span className="mx-4 ">{dataRoom?.room[1]?.count}</span>
                    <span
                      onClick={() => handleUpdateRoom(1, dataRoom, true)}
                      className="cursor-pointer border-[1px] border-gray-600 rounded-full px-3 py-1"
                    >{`>`}</span>
                  </div>
                </>
              )}
            </>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
