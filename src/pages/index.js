import { supabase } from "../../utils/supabase";
import Link from "next/link";
import { useUser } from "../../context/user";

export default function Home({ lessons }) {
  const { user } = useUser();
  console.log({ user });
  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4 bg-gray-100 py-8 rounded-lg shadow-lg">
      <h1 className="text-3xl mb-8 font-bold text-center text-gray-800">Lessons</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id} className="mb-6 last:mb-0">
            <Link href={`/${lesson.id}`}>
               <div className="block p-6 h-40 rounded-lg shadow-md text-xl flex items-center justify-center bg-white hover:bg-gray-200 transition-colors duration-300">
                {lesson.title}
                </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const { data: lessons, error } = await supabase.from('lesson').select('*').order('id');
    if (error) {
      console.error("Error fetching lessons:", error);
      throw error;
    }

    return {
      props: {
        lessons,
      },
    };
  } catch (err) {
    console.error("Error fetching lessons:", err);
    return {
      props: {
        lessons: [],
      },
    };
  }
};
