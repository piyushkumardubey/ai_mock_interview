'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import InterviewCard from '@/components/InterviewCard';
import { dummyInterviews } from '@/constants';

// ✅ Uncomment this section when integrating backend
/*
import {
  getCurrentUser,
  getInterviewsByUserId,
  getLatestInterviews
} from '@/lib/actions/auth.action';
*/

const Page = () => {
    // ✅ Replace dummyInterviews logic with this when using server-side data
    /*
    const user = await getCurrentUser();

    const [userInterviews, latestInterviews] = await Promise.all([
      getInterviewsByUserId(user?.id),
      getLatestInterviews({ userId: user?.id }),
    ]);

    const hasUserInterviews = userInterviews?.length > 0;
    const hasLatestInterviews = latestInterviews?.length > 0;
    */

    const hasUserInterviews = dummyInterviews.length > 0;
    const hasLatestInterviews = dummyInterviews.length > 0;

    return (
        <>
            {/* Hero Section */}
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className="text-lg">
                        Practice real interview questions & get instant feedback
                    </p>

                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>

                <Image
                    src="/robot.png"
                    alt="robo-dude"
                    width={400}
                    height={400}
                    className="max-sm:hidden"
                />
            </section>

            {/* Your Interviews Section */}
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className="interviews-section">
                    {hasUserInterviews ? (
                        dummyInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <p>You haven&apos;t taken any interviews yet</p>
                    )}
                </div>
            </section>

            {/* Take Interviews Section */}
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take Interviews</h2>
                <div className="interviews-section">
                    {hasLatestInterviews ? (
                        dummyInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <p>There are no new interviews available</p>
                    )}
                </div>
            </section>
        </>
    );
};


export default Page;
