"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { vapi } from '@/lib/vapi.sdk';



enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const onCallstart =() =>setCallStatus(CallStatus.ACTIVE);
        const onCallEnd =() =>setCallStatus(CallStatus.FINISHED);

        const onMessage =(messages: Message)=>{
            if(messages.type ==='transcript' && messages.transcriptType === 'final'){
                const newMessage = { role:messages.role, content: messages.transcript};

                setMessages((prev) =>[...prev, newMessage]);
            }
        }
        const  onSpeechStart =() =>setIsSpeaking(true);
        const onSpeechEnd =() =>setIsSpeaking(false);

        const onError =(error: Error)=> console.log('Error' ,error);

        vapi.on('call-start' ,onCallstart);
        vapi.on('call-end' ,onCallEnd);
        vapi.on('message' ,onMessage);
        vapi.on('speech-start' ,onSpeechStart);
        vapi.on('speech-end' ,onSpeechEnd);
        vapi.on('error' ,onError);

        return () => {
            vapi.off('call-start' ,onCallstart);
            vapi.off('call-end' ,onCallEnd);
            vapi.off('message' ,onMessage);
            vapi.off('speech-start' ,onSpeechStart);
            vapi.off('speech-end' ,onSpeechEnd);
            vapi.off('error' ,onError);

        }
    }, []);

useEffect(() => {
    if(callStatus=== CallStatus.FINISHED) router.push('/');
}, [messages, callStatus, type, userId, router]);

const  handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
            username: userName,
            userid: userId,
        },
    });

}

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };
    const latestMessages = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;



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
                    <h3>{userName}</h3>
                </div>
            </div>
        </div>
            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p
                            key={latestMessages}
                            className={cn(
                                "transition-opacity duration-500 opacity-0",
                                "animate-fadeIn opacity-100"
                            )}
                        >
                            {latestMessages}
                        </p>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center">
                {callStatus !== "ACTIVE" ? (
                    <button className="relative btn-call" onClick={handleCall}>
                        <span className={cn(
                            "absolute animate-ping rounded-full opacity-75",
                            callStatus !== "CONNECTING" && "hidden"
                        )}
                        />
                            <span>
                                {isCallInactiveOrFinished
                                    ? "Call"
                                    : ". . ."}
                            </span>
                    </button>

                    ) : (
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                        End
                    </button>
                )}
                    </div>
        </>
    );
};

export default Agent;
