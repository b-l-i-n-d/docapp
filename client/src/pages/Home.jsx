import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const user = useSelector((store) => store.userState.user);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-lg font-bold">This is home page</h1>
            {user && <h1>{user.name}</h1>}
        </div>
    );
}

export default Home;
