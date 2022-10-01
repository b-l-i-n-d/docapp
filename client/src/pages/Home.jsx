import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const user = useSelector((store) => store.userState.user);

    return (
        <div className="site-layout-background text-center mx-0 my-4">
            <p className="text-xl">{user.name}</p>
            {
                // indicates very long content
                Array.from(
                    {
                        length: 100,
                    },
                    (_, index) => (
                        <React.Fragment key={index}>
                            {index % 20 === 0 && index ? 'more' : '...'}
                            <br />
                        </React.Fragment>
                    )
                )
            }
        </div>
    );
}

export default Home;
