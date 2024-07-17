const apiCall = async (route, options, rejectWithValue) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}${route}`,
      options
    );
    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.errors || "Network response was not ok");
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
};

export default apiCall;
