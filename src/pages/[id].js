import { supabase } from "../../utils/supabase";

const LessonDetails = ({ lesson }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-8">
                <h1 className="text-4xl mb-4 font-semibold text-gray-700">Lesson: {lesson.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{lesson.description}</p>
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
