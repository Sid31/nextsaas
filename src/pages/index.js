import { supabase } from "../../utils/supabase";

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The rendered Home component.
 */
export default function Home({ lessons }) {
  console.log(lessons);

    return (
        <div className="flex flex-col items-center justify-min-h-screen">
            {lessons.map((lesson) => (
                <div key={lesson.id}>{lesson.title}</div>
            ))}
        </div>
    );
}
export const getStaticProps = async () => {
  try {
    const { data: lessons, error } = await supabase.from('lesson').select('*').order('id');
    if (error) console.error(error);
    x
    if (error) {
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
