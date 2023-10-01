import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import Video from "react-player";

const LessonDetails = ({ lesson }) => {
  const [videoUrl, setVideoUrl] = useState();

  const getPremiumContent = async () => {
    const { data } = await supabase
      .from("premium_content")
      .select("video_url")
      .eq("id", lesson.id)
      .single();

    setVideoUrl(data?.video_url);
  };

  useEffect(() => {
    getPremiumContent();
  }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-8">
                <h1 className="text-4xl mb-4 font-semibold text-gray-700">Lesson: {lesson.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{lesson.description}</p>
                {!!videoUrl && <Video url={videoUrl} width="100%" />}
            </div>
        </div>
    );
};

export const getStaticPaths = async () => {
    const { data: lessons } = await supabase.from('lesson').select('id');
    const paths = lessons.map(({ id }) => ({
        params: { id: id.toString() }
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params: { id } }) => {
    const { data: lesson } = await supabase.from('lesson').select('*').eq('id', id).single();
    return {
        props: {
            lesson,
        },
    };
};

export default LessonDetails;
