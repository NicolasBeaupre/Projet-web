import { fetchFilteredQuiz } from '../../lib/action';

export default async function QuizTable({
  query
}: {
  query: string;
}) {
  const quizs = await fetchFilteredQuiz(query);

  return (

    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {quizs?.map((quiz) => (
              <div
                key={quiz.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <a href={`/jeu/${quiz.id}`}>{quiz.nomQuiz}</a>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
