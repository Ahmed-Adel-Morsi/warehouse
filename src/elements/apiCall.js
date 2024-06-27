const apiCall = async (url, options, rejectWithValue) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.message || "Network response was not ok"
      );
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
};

export default apiCall;
