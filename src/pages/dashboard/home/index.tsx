import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { GITHUB_TOKEN } from "~/lib/config";

const HomePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("stars");

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  const fetchRepoDetails = async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${value}&sort=${sort}`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    );
    return response.json();
  };

  const { data, isLoading, isSuccess, error } = useQuery<any>(
    ["fetchRepoDetails", sort, value],
    fetchRepoDetails,
    {
      enabled: !!value,
    }
  );

  console.log(data, error, isLoading);
  const sortFields = [
    "name",
    "stars",
    "watchers",
    "score",
    "created_at",
    "updated_at",
  ];

  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.items?.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data?.items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="bg-orange-400 min-h-screen pt-8 px-8">
      <div className="flex justify-between">
        <div>
          <input
            className="bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent rounded-lg py-2 px-4 block w-80 appearance-none leading-normal"
            type="text"
            value={value}
            placeholder="Search for a public repository ..."
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </div>
        <div className="flex gap-2 mt-4 items-center">
          <p>Sort by - </p>
          {sortFields.map((field, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="radio"
                id={field}
                name={field}
                value={field}
                checked={sort === field}
                onChange={handleSortChange}
              />
              <label htmlFor={field}>{field}</label>
              <br />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {value && isLoading && <p>Loading...</p>}
        {isSuccess && data?.items && (
          <div className="px-4">
            <div className="flex gap-2 items-center justify-start">
              <div className="text-white text-2xl font-bold">
                {data.total_count} results
              </div>
              <div>
                <ReactPaginate
                  breakLabel="..."
                  breakClassName="break-me"
                  containerClassName="flex gap-2 justify-center ml-12 mt-1"
                  disabledClassName="hidden"
                  marginPagesDisplayed={2}
                  activeClassName="bg-indigo-500 text-white px-1 rounded"
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
            <div className="my-8 flex gap-2 flex-wrap ">
              {currentItems?.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg w-96 min-h-60 p-4 shadow-lg flex items-start justify-start"
                >
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex items-center justify-center">
                      <img
                        src={item.owner.avatar_url}
                        alt={item.owner.login}
                        className="w-12 h-12 rounded-full mb-2"
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 text-lg font-bold">
                        {item.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.owner.login}
                      </p>
                      {item.description && (
                        <p className="text-gray-600 text-sm">
                          Description - {item.description}
                        </p>
                      )}
                      {item.language && (
                        <p className="text-gray-600 text-sm">
                          Language - {item.language}
                        </p>
                      )}

                      <div className="flex items-center justify-star gap-4 mt-4">
                        <div className="bg-gray-200 flex gap-2 rounded-lg p-2">
                          <p className="text-gray-600 text-sm">Stars</p>
                          <p className="text-gray-800 text-sm font-bold text-center">
                            {item.stargazers_count}
                          </p>
                        </div>
                        <div className="bg-gray-200 flex gap-2 rounded-lg p-2">
                          <p className="text-gray-600 text-sm">Forks</p>
                          <p className="text-gray-800 text-sm font-bold text-center">
                            {item.forks_count}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
