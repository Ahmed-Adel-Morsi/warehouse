const apiCall = async (route, options, rejectWithValue) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}${route}`,
      options
    );
    const data = await response.json();

    if (!data.success) {
      return rejectWithValue(data || { message: "حدث خطأ ما" });
    }

    return data.data;
  } catch (error) {
    return rejectWithValue(error.message || "حدث خطأ ما");
  }
};

export default apiCall;
