import React from 'react';
import Image from 'next/image';
import {cn} from "@/lib/utils";
enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

interface AgentProps {
    username: string;
}

const Agent = ({ username }: AgentProps) => {
    const isSpeaking = true;

    const  callStatus = CallStatus.FINISHED;
    const messages = [
        'Whats your name?',
        'My name is Piyush Dubey, nice to meet you!'
    ];
    const lastMessage = messages[messages.length - 1];
    return (
        <>
        <div className="call-view">
            {/* AI Interviewer Card */}
            <div className="card-interviewer">
                <div className="avatar">
                    <Image
                        src="/ai-avatar.png"
                        alt="AI Interviewer"
                        width={65}
                        height={54}
                        className="object-cover"
                    />
                    {isSpeaking && <span className="animate-speak" />}
                </div>
                <h3>AI Interviewer</h3>
            </div>

            {/* User Card */}
            <div className="card-border">
                <div className="card-content">
                    <Image
                        src="/user-avatar.png"
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className="rounded-full object-cover size-[120px]"
                    />
                    <h3>{username}</h3>
                </div>
            </div>
        </div>
            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p
                            key={lastMessage}
                            className={cn(
                                "transition-opacity duration-500 opacity-0",
                                "animate-fadeIn opacity-100"
                            )}
                        >
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center">
                {callStatus !== "ACTIVE" ? (
                    <button className="relative btn-call">
                        <span className={cn('absolute animate-ping rounded-full opacity-75' , callStatus !== 'CONNECTION' & 'hidden')}
                        />
                            <span>
                                {callStatus === "INACTIVE" || callStatus === "FINISHED"
                                    ? "Call"
                                    : ". . ."}
                            </span>
                    </button>

                    ) : (
                    <button className="btn-disconnect" >
                        End
                    </button>
                )}
                    </div>
        </>
    );
};

export default Agent;
