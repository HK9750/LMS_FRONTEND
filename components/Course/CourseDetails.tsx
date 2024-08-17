import React, { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "@/redux/features/course/courseapi";
import CourseContentList from "./CourseContentList";
import CoursePlayer from "@/components/Admin/VideoPlayer";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/order/orderapi";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  id: string;
};

const CourseDetails = ({ id }: Props) => {
  const { data } = useGetCourseByIdQuery(id);
  const { data: userDetails } = useLoadUserQuery(undefined, {});
  const user = userDetails?.user;
  const [open, setOpen] = useState(false);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  const discountPercent: number =
    data?.course?.estimatedPrice && data?.course?.price
      ? parseFloat(
          (
            ((data.course.estimatedPrice - data.course.price) /
              data.course.estimatedPrice) *
            100
          ).toFixed(0)
        )
      : 0;

  const isPurchased = user?.courses?.some(
    (course: any) => course.courseId === id
  );

  useEffect(() => {
    if (config) {
      const publishableKey = config.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
  }, [config]);

  useEffect(() => {
    if (data) {
      const amount = Math.round(parseFloat(data.course.price) * 100);
      createPaymentIntent({ amount });
    }
  }, [data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData.client_secret);
    }
  }, [paymentIntentData]);

  const handleOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <div className="text-foreground flex w-full h-full justify-center mt-5">
        <div className="w-[75%]">
          <div className="space-y-8 w-[80%]">
            <div className="flex flex-wrap justify-center">
              <h1 className="text-3xl font-bold">{data?.course?.name}</h1>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">☆☆☆☆☆</span>
                <span>0 Reviews</span>
              </div>
            </div>

            {/* What you'll learn Section */}
            <div>
              <h2 className="text-2xl font-semibold">
                What you will learn from this course?
              </h2>
              <ul className="mt-2 space-y-1">
                {data?.course?.benefits?.map((item: any, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>✔️</span>
                    <span>{item?.title || "abc"}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites Section */}
            <div>
              <h2 className="text-2xl font-semibold">
                What are the prerequisites for starting this course?
              </h2>
              <ul className="mt-2 space-y-1">
                {data?.course?.prerequisites?.map(
                  (item: any, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span>✔️</span>
                      <span>{item.title || "abc"}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h1 className="text-2xl font-semibold mb-6">Course Overview</h1>
              <CourseContentList
                data={data?.course?.courseData}
                isDemo={true}
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">Course Details</h1>
              <p className="mt-2">{data?.course?.description}</p>
            </div>
          </div>
        </div>

        <div className="w-[25%] flex flex-col justify-start gap-y-4">
          <CoursePlayer
            videoUrl={data?.course?.demoUrl}
            title={data?.course?.name}
          />

          <div>
            {/* Price and Discount Section */}
            <div className="mt-4 h-full p-2">
              <div className="text-3xl font-bold ">
                {data?.course?.price ? `$${data.course.price}` : "Free"}
                {data?.course?.estimatedPrice && (
                  <span className="line-through text-muted-foreground text-lg ml-2">
                    ${data.course.estimatedPrice}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-green-500 ml-2">
                    {discountPercent}% Off
                  </span>
                )}
              </div>
              <div className="mt-4">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data?.course?._id}`}
                    className="bg-red-500 text-white py-2 px-6 rounded-full cursor-pointer"
                  >
                    Enter Course
                  </Link>
                ) : (
                  <button
                    onClick={handleOrder}
                    className="cursor-pointer bg-red-500 text-white py-2 px-6 rounded-full"
                  >
                    {`Buy Now for $${data?.course?.price}`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Course Features */}
          <ul className="mt-6 text-muted-foreground space-y-1">
            <li>Source code included</li>
            <li>Full lifetime access</li>
            <li>Certificate of completion</li>
            <li>Premium Support</li>
          </ul>
        </div>
      </div>

      {open && (
        <div className="w-full h-screen top-0 left-0 fixed flex items-center justify-center z-50 bg-slate-900">
          <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={40}
                className="text-foreground cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full">
              {stripePromise && clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm data={data} setOpen={setOpen} />
                </Elements>
              ) : (
                <div>Loading payment form...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
