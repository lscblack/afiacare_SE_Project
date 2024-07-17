import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';

// Replace with your actual API endpoint
const fakeDataUrl = 'https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo';

const PeopleInNeed = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        // Adding a needDescription and additionalInfo for demonstration purposes
        const resultsWithNeeds = res.results.map((person) => ({
          ...person,
          needDescription: 'Needs blood donation due to surgery',
       
        }));
        setInitLoading(false);
        setData(resultsWithNeeds);
        setList(resultsWithNeeds);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(3)].map(() => ({
          loading: true,
          name: {},
          picture: {},
          needDescription: '',
          additionalInfo: '',
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = res.results.map((person) => ({
          ...person,
          needDescription: 'Needs blood donation due to surgery',
         
        }));
        const updatedData = data.concat(newData);
        setData(updatedData);
        setList(updatedData);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore = !initLoading && !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  ) : null;

  return (
    
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-donate">Donate</a>, <a key="list-loadmore-more">More</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://example.com">{item.name?.first} {item.name?.last}</a>}
              description={item.needDescription}
            />
            <div>{item.additionalInfo}</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default PeopleInNeed;
