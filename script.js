// --- DATA SOURCE ---
const allExams = {
    exam1: {
        title: "Bài Thi Trắc Nghiệm số 1",
        questions: [
            { question: "Đối tượng nào sau đây không thuộc phạm vi áp dụng của Luật Đấu thầu?", options: ["Cơ quan nhà nước sử dụng vốn ngân sách nhà nước", "Doanh nghiệp nhà nước thực hiện dự án đầu tư sử dụng vốn ngân sách nhà nước", "Doanh nghiệp do doanh nghiệp nhà nước nắm 100% vốn điều lệ thực hiện dự án đầu tư không sử dụng vốn ngân sách nhà nước", "Tổ chức chính trị - xã hội sử dụng NSNN, nguồn thu hợp pháp của tổ chức để thực hiện dự án đầu tư"], answer: "Doanh nghiệp do doanh nghiệp nhà nước nắm 100% vốn điều lệ thực hiện dự án đầu tư không sử dụng vốn ngân sách nhà nước" },
            { question: "Điều kiện nào sau đây KHÔNG phải là điều kiện về tư cách hợp lệ của nhà thầu là tổ chức?", options: ["Có năng lực và kinh nghiệm để thực hiện gói thầu", "Hạch toán tài chính độc lập", "Không đang trong quá trình giải thể hoặc bị thu hồi giấy chứng nhận đăng ký doanh nghiệp", "Có đăng ký thành lập, hoạt động theo pháp luật Việt Nam hoặc nước ngoài"], answer: "Có năng lực và kinh nghiệm để thực hiện gói thầu" },
            { question: "Nhà thầu tham dự thầu phải bảo đảm cạnh tranh trong đấu thầu với:", options: ["Chủ đầu tư", "Nhà thầu tư vấn lập HSMT cho gói thầu đó", "Nhà thầu tư vấn thẩm định KQLCNT cho gói thầu đó", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Ai chịu trách nhiệm đăng tải thông tin về năng lực, kinh nghiệm của nhà thầu trên Hệ thống mạng đấu thầu quốc gia?", options: ["Trung tâm đấu thầu qua mạng Quốc gia", "Chủ đầu tư", "Người có thẩm quyền", "Nhà thầu"], answer: "Nhà thầu" },
            { question: "Đối tượng nào sau đây KHÔNG được hưởng ưu đãi trong lựa chọn nhà thầu?", options: ["Doanh nghiệp nhà nước", "Nhà thầu là doanh nghiệp khoa học và công nghệ", "Hàng hóa có xuất xứ Việt Nam", "Nhà thầu là doanh nghiệp nhỏ, siêu nhỏ"], answer: "Doanh nghiệp nhà nước" },
            { question: "Đối với gói thầu áp dụng hình thức đấu thầu rộng rãi, nhà thầu tham dự thầu gói thầu xây lắp phải độc lập về pháp lý và tài chính với bên nào sau đây?", options: ["Nhà thầu khác cùng tham dự thầu", "Nhà cung cấp vật tư", "Chủ đầu tư", "Nhà thầu phụ cùng tham dự thầu gói thầu đó"], answer: "Chủ đầu tư" },
            { question: "Trường hợp, nhà thầu thuộc diện được hưởng nhiều loại ưu đãi, việc tính ưu đãi được thực hiện như thế nào?", options: ["Chỉ được hưởng một loại ưu đãi có lợi nhất cho nhà thầu", "Tùy thuộc vào quyết định của chủ đầu tư", "Cộng gộp tất cả các ưu đãi", "Xin ý kiến của Người có thẩm quyền"], answer: "Chỉ được hưởng một loại ưu đãi có lợi nhất cho nhà thầu" },
            { question: "Chi phí lập hoặc thẩm định kế hoạch tổng thể lựa chọn nhà thầu được tính bằng bao nhiêu phần trăm chi phí lập báo cáo nghiên cứu khả thi?", options: ["1%", "2%", "0,5%", "0,1%"], answer: "0,5%" },
            { question: "Phương thức một giai đoạn một túi hồ sơ KHÔNG áp dụng cho trường hợp nào?", options: ["Gói thầu phi tư vấn được tổ chức theo hình thức chào hàng cạnh tranh", "Gói thầu xây lắp áp dụng hình thức chỉ định thầu theo quy trình thông thường", "Gói thầu mua sắm hàng hóa được tổ chức đấu thầu rộng rãi", "Gói thầu tư vấn được tổ chức đấu thầu rộng rãi"], answer: "Gói thầu tư vấn được tổ chức đấu thầu rộng rãi" },
            { question: "Sau khi có quyết định phê duyệt kết quả lựa chọn nhà thầu, chủ đầu tư phải đăng tải thông tin về kết quả lựa chọn nhà thầu trong thời hạn bao lâu?", options: ["10 ngày", "05 ngày làm việc", "01 ngày làm việc", "03 ngày làm việc"], answer: "05 ngày làm việc" },
            { question: "Nhà thầu tham dự gói thầu EPC được tổ chức đấu thầu rộng rãi phải độc lập về pháp lý và tài chính với bên nào sau đây?", options: ["Nhà thầu phụ", "Nhà thầu cung cấp vật tư cho gói thầu", "Nhà thầu khác cùng tham dự thầu", "Nhà thầu lập, thẩm tra thiết kế FEED"], answer: "Nhà thầu lập, thẩm tra thiết kế FEED" },
            { question: "Hồ sơ đề xuất về tài chính của nhà thầu không vượt qua bước đánh giá về kỹ thuật sẽ được xử lý như thế nào?", options: ["Hủy bỏ ngay sau khi có Quyết định phê duyệt danh sách nhà thầu đạt kỹ thuật", "Công khai trên Hệ thống mạng đấu thầu quốc gia", "Lưu trữ vĩnh viễn tại Chủ đầu tư", "Được trả lại nguyên trạng cho nhà thầu theo thời hạn quy định"], answer: "Được trả lại nguyên trạng cho nhà thầu theo thời hạn quy định" },
            { question: "Thông tin nào sau đây phải được đăng tải công khai trên Hệ thống mạng đấu thầu quốc gia?", options: ["Thông tin về tài sản nhà thầu", "Thông tin cá nhân nhà thầu", "Thông tin về hợp đồng lao động của nhà thầu", "Thông tin về nhà thầu vi phạm, không bảo đảm uy tín"], answer: "Thông tin về nhà thầu vi phạm, không bảo đảm uy tín" },
            { question: "Cơ sở dữ liệu quốc gia về nhà thầu KHÔNG bao gồm thông tin nào sau đây?", options: ["Thông tin về tên địa chỉ của nhà thầu", "Thông tin về catalog hàng hóa mà nhà thầu có khả năng cung cấp", "Thông tin về số lượng lao động của nhà thầu", "Thông tin về năng lực, kinh nghiệm của nhà thầu"], answer: "Thông tin về catalog hàng hóa mà nhà thầu có khả năng cung cấp" },
            { question: "Thẩm quyền phê duyệt kế hoạch lựa chọn nhà thầu đối với dự án?", options: ["Cơ quan quản lý nhà nước về đấu thầu", "Người có thẩm quyền", "Chủ đầu tư nếu được người có thẩm quyền ủy quyền", "Chủ đầu tư"], answer: "Chủ đầu tư" },
            { question: "Điều kiện nào sau đây KHÔNG phải là điều kiện tổ chức đấu thầu quốc tế để lựa chọn nhà thầu?", options: ["Gói thầu mà nhà thầu trong nước không đáp ứng yêu cầu", "Gói thầu mua sắm hàng hóa trong nước không sản xuất được", "Gói thầu mua sắm hàng hóa đã được nhập khẩu và chào bán tại Việt Nam", "Nhà tài trợ vốn yêu cầu đấu thầu quốc tế"], answer: "Gói thầu mua sắm hàng hóa đã được nhập khẩu và chào bán tại Việt Nam" },
            { question: "Ngôn ngữ sử dụng trong đấu thầu quốc tế là gì?", options: ["Tiếng Việt", "Tiếng Trung", "Tiếng Pháp", "Tiếng Anh hoặc song ngữ: tiếng Việt và tiếng Anh"], answer: "Tiếng Anh hoặc song ngữ: tiếng Việt và tiếng Anh" },
            { question: "Đối với đấu thầu trong nước, nhà thầu được chào thầu bằng loại tiền nào?", options: ["Đồng Việt Nam (VND)", "Nhân dân tệ (CNY) hoặc đồng Việt Nam", "Đô la Mỹ (USD) hoặc đồng Việt Nam", "Euro (EUR) hoặc đồng Việt Nam"], answer: "Đồng Việt Nam (VND)" },
            { question: "Biện pháp nào sau đây KHÔNG phải là biện pháp bảo đảm dự thầu?", options: ["Ký hợp đồng nguyên tắc", "Đặt cọc", "Nộp thư bảo lãnh của tổ chức tín dụng", "Nộp giấy chứng nhận bảo hiểm bảo lãnh"], answer: "Ký hợp đồng nguyên tắc" },
            { question: "Chào giá trực tuyến là:", options: ["Việc nhà thầu gửi báo giá qua email", "Việc chủ đầu tư công bố giá trên website", "Việc nhà thầu gửi báo giá qua bưu điện", "Quá trình lặp lại nhiều lần việc nhà thầu sử dụng phương tiện điện tử để đưa ra mức giá mới trên Hệ thống mạng đấu thầu quốc gia"], answer: "Quá trình lặp lại nhiều lần việc nhà thầu sử dụng phương tiện điện tử để đưa ra mức giá mới trên Hệ thống mạng đấu thầu quốc gia" },
            { question: "Tỷ lệ cổ phần, vốn góp giữa các bên trong liên danh được xác định tại thời điểm nào?", options: ["Khi phê duyệt kết quả lựa chọn nhà thầu", "Khi ký hợp đồng", "Trước thời điểm đóng thầu", "Sau khi mở thầu"], answer: "Trước thời điểm đóng thầu" },
            { question: "Trường hợp tất cả các nhà thầu tham dự thầu đều được hưởng ưu đãi như nhau thì:", options: ["Chỉ tính ưu đãi cho nhà thầu có giá thấp nhất", "Không cần tính ưu đãi để so sánh, xếp hạng", "Chỉ tính ưu đãi cho nhà thầu trong nước", "Vẫn phải cộng ưu đãi vào giá dự thầu"], answer: "Không cần tính ưu đãi để so sánh, xếp hạng" },
            { question: "Chi phí nào sau đây nhà thầu phải chịu trong lựa chọn nhà thầu?", options: ["Chi phí thẩm định kết quả lựa chọn nhà thầu", "Chi phí thuê tư vấn đánh giá HSDT", "Chi phí nộp hồ sơ dự thầu", "Chi phí đăng tải thông tin về đấu thầu"], answer: "Chi phí nộp hồ sơ dự thầu" },
            { question: "Hành vi nào sau đây bị cấm trong hoạt động đấu thầu?", options: ["Đưa, nhận, môi giới hối lộ", "Gian lận, thông thầu", "Cản trở hoạt động đấu thầu", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Trường hợp nào sau đây KHÔNG là lý do hủy thầu đối với lựa chọn nhà thầu?", options: ["Thay đổi về mục tiêu, phạm vi đầu tư trong quyết định đầu tư đã được phê duyệt", "Hồ sơ mời thầu không tuân thủ quy định của Luật Đấu thầu", "Nhà thầu trúng thầu thực hiện hành vi bị cấm", "Tất cả hồ sơ dự thầu không đáp ứng yêu cầu"], answer: "Nhà thầu trúng thầu thực hiện hành vi bị cấm" },
            { question: "Đấu thầu hạn chế được áp dụng khi nào?", options: ["Khi nhà tài trợ yêu cầu tổ chức đấu thầu quốc tế", "Khi chủ đầu tư muốn rút ngắn thời gian đấu thầu", "Gói thầu có yêu cầu đặc thù về kỹ thuật mà chỉ có một số nhà thầu đáp ứng yêu cầu của gói thầu", "Khi gói thầu có giá trị trên 100 tỷ đồng"], answer: "Gói thầu có yêu cầu đặc thù về kỹ thuật mà chỉ có một số nhà thầu đáp ứng yêu cầu của gói thầu" },
            { question: "Chào hàng cạnh tranh không áp dụng cho gói thầu thuộc lĩnh vực nào?", options: ["Xây lắp đơn giản", "Mua sắm hàng hóa thông dụng", "Phi tư vấn đơn giản", "Tư vấn"], answer: "Tư vấn" },
            { question: "Điều kiện để áp dụng mua sắm trực tiếp là gì?", options: ["Nhà thầu đã trúng thầu qua đấu thầu rộng rãi hoặc hạn chế và thời gian từ khi ký hợp đồng trước đó đến ngày phê duyệt kết quả MSTT không quá 12 tháng", "Khối lượng mua sắm không vượt 130% so với hợp đồng trước đó", "Đơn giá không vượt đơn giá của phần việc tương tự thuộc hợp đồng trước đó", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Hình thức tự thực hiện yêu cầu chủ đầu tư phải đáp ứng điều kiện gì?", options: ["Có năng lực kỹ thuật, tài chính và kinh nghiệm đáp ứng yêu cầu của gói thầu và có phương án khả thi huy động nhân sự, máy móc, thiết bị đáp ứng yêu cầu về tiến độ thực hiện gói thầu", "Có ít nhất 5 năm kinh nghiệm trong lĩnh vực liên quan", "Chỉ áp dụng cho gói thầu dưới 10 tỷ đồng", "Được cơ quan cấp trên trực tiếp phê duyệt"], answer: "Có năng lực kỹ thuật, tài chính và kinh nghiệm đáp ứng yêu cầu của gói thầu và có phương án khả thi huy động nhân sự, máy móc, thiết bị đáp ứng yêu cầu về tiến độ thực hiện gói thầu" },
            { question: "Đối tượng nào được tham gia thực hiện gói thầu theo hình thức tham gia thực hiện của cộng đồng?", options: ["Cộng đồng dân cư, tổ, nhóm thợ đủ năng lực tại địa phương nơi có gói thầu được giao thực hiện", "Doanh nghiệp nhà nước đóng trên địa bàn", "Cá nhân có chứng chỉ hành nghề xây dựng", "Tổ chức phi chính phủ nước ngoài"], answer: "Cộng đồng dân cư, tổ, nhóm thợ đủ năng lực tại địa phương nơi có gói thầu được giao thực hiện" },
            { question: "Đàm phán giá được áp dụng cho trường hợp nào?", options: ["Tất cả các gói thầu thuộc ngành y tế", "Mua biệt dược gốc, sinh phẩm tham chiếu", "Dự án sử dụng vốn vay nước ngoài", "Gói thầu xây lắp có giá trên 100 tỷ đồng"], answer: "Mua biệt dược gốc, sinh phẩm tham chiếu" },
            { question: "Lựa chọn nhà thầu trong trường hợp đặc biệt áp dụng khi nào?", options: ["Đối với gói thầu thuộc dự án, dự toán mua sắm có một hoặc một số điều kiện đặc thù về quy trình, thủ tục, tiêu chí lựa chọn nhà thầu, điều kiện ký kết và thực hiện hợp đồng", "Khi gói thầu có giá trị dưới 10 tỷ đồng", "Khi có sự đồng ý bằng văn bản của thủ tướng chính phủ", "Khi chủ đầu tư là doanh nghiệp nhà nước"], answer: "Đối với gói thầu thuộc dự án, dự toán mua sắm có một hoặc một số điều kiện đặc thù về quy trình, thủ tục, tiêu chí lựa chọn nhà thầu, điều kiện ký kết và thực hiện hợp đồng" },
            { question: "Nội dung kế hoạch tổng thể lựa chọn nhà thầu KHÔNG bao gồm:", options: ["Phân tích, tham vấn thị trường", "Kế hoạch bố trí vốn để thực hiện dự toán mua sắm", "Đánh giá năng lực, nguồn lực của chủ đầu tư", "Phân tích bối cảnh thực hiện dự án"], answer: "Kế hoạch bố trí vốn để thực hiện dự toán mua sắm" },
            { question: "Thông tin về vi phạm của nhà thầu được cập nhật vào:", options: ["Cơ sở dữ liệu quốc gia về nhà thầu trên Hệ thống mạng đấu thầu quốc gia", "Trang thông tin của Bộ Tài chính", "Trang thông tin của chủ đầu tư", "Cổng dịch vụ công Quốc gia"], answer: "Cơ sở dữ liệu quốc gia về nhà thầu trên Hệ thống mạng đấu thầu quốc gia" },
            { question: "Chủ đầu tư phải công khai kết quả thực hiện hợp đồng của nhà thầu trên:", options: ["Trang thông tin của Bộ Xây dựng", "Tất cả các phương án trên", "Hệ thống mạng đấu thầu quốc gia", "Trang thông tin của chủ đầu tư"], answer: "Hệ thống mạng đấu thầu quốc gia" },
            { question: "Đối với các gói thầu thông thường, thành viên tổ chuyên gia phải đáp ứng yêu cầu:", options: ["Tốt nghiệp đại học trở lên", "Có tối thiểu 03 năm công tác trong lĩnh vực liên quan", "Có chứng chỉ nghiệp vụ chuyên môn về đấu thầu", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Giá gói thầu có thể được lập căn cứ vào thông tin nào sau đây?", options: ["Dự toán gói thầu được duyệt", "Kết quả lựa chọn nhà thầu đối với hàng hóa, dịch vụ tương tự trong thời gian tối đa 12 tháng trước ngày trình kế hoạch lựa chọn nhà thầu", "Báo giá của hàng hóa, dịch vụ", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Giá gói thầu được cập nhật trong thời hạn bao nhiêu ngày trước ngày mở thầu nếu cần thiết?", options: ["14 ngày", "28 ngày", "7 ngày", "30 ngày"], answer: "28 ngày" },
            { question: "Trường hợp người có chủ đầu tư cho cơ quan, đơn vị trực thuộc thực hiện việc thẩm định kết quả lựa chọn nhà thầu, chi phí thẩm định được xác định bằng bao nhiêu phần trăm giá gói thầu?", options: ["0,05%", "0,15%", "0,1%", "0,2%"], answer: "0,1%" },
            { question: "Chủ đầu tư chịu trách nhiệm đăng tải kế hoạch lựa chọn nhà thầu trên Hệ thống mạng đấu thầu quốc gia trong thời hạn bao lâu kể từ ngày văn bản được ban hành?", options: ["03 ngày làm việc", "10 ngày", "07 ngày làm việc", "05 ngày làm việc"], answer: "05 ngày làm việc" },
            { question: "Việc phân chia gói thầu căn cứ vào:", options: ["Quy mô, tính chất các công việc", "Tiến độ thực hiện dự án", "Kết quả phân tích, tham vấn thị trường", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Tổ chuyên gia trong lựa chọn nhà thầu được thành lập như thế nào?", options: ["Chủ đầu tư quyết định thành lập tổ chuyên gia đáp ứng quy định", "Người có thẩm quyền quyết định thành lập tổ chuyên gia", "Đơn vị tư vấn quyết định thành lập tổ chuyên gia", "Đáp án A và đáp án C đều đúng"], answer: "Đáp án A và đáp án C đều đúng" },
            { question: "Trường hợp không lập kế hoạch tổng thể lựa chọn nhà thầu, chủ đầu tư có thể tiến hành phân tích, tham vấn thị trường để:", options: ["Lập kế hoạch lựa chọn nhà thầu", "Lập hồ sơ mời thầu", "Lập hồ sơ yêu cầu", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Điều kiện để lựa chọn nhà thầu trong trường hợp đặc biệt là:", options: ["Gói thầu thuộc dự án, dự toán mua sắm có một hoặc một số điều kiện đặc thù", "Gói thầu thuộc dự án đầu tư công.", "Gói thầu đặc thù về phát triển khoa học, công nghệ", "Đáp án A và đáp án C đều đúng."], answer: "Đáp án A và đáp án C đều đúng." },
            { question: "Phương thức lựa chọn nhà thầu đối với gói thầu xây lắp không yêu cầu kỹ thuật cao có giá gói thầu 25 tỷ đồng là:", options: ["Một giai đoạn hai túi hồ sơ.", "Đáp án A và đáp án B đều đúng.", "Một giai đoạn một túi hồ sơ.", "Do Người có thẩm quyền quyết định"], answer: "Một giai đoạn một túi hồ sơ." },
            { question: "Phương thức một giai đoạn hai túi hồ sơ được áp dụng trong trường hợp nào sau đây?", options: ["Gói thầu mua sắm hàng hóa áp dụng hình thức mua sắm trực tiếp", "Gói thầu xây lắp áp dụng hình thức chào hàng cạnh tranh", "Gói thầu phi tư vấn áp dụng hình thức chỉ định thầu", "Gói thầu dịch vụ tư vấn áp dụng hình thức đấu thầu rộng rãi"], answer: "Gói thầu dịch vụ tư vấn áp dụng hình thức đấu thầu rộng rãi" },
            { question: "Thẩm quyền phê duyệt kế hoạch tổng thể lựa chọn nhà thầu đối với dự án?", options: ["Cơ quan quản lý nhà nước về đấu thầu", "Chủ đầu tư nếu được người có thẩm quyền ủy quyền", "Chủ đầu tư", "Người có thẩm quyền"], answer: "Người có thẩm quyền" },
            { question: "Hồ sơ dự thầu không bắt buộc phải có tài liệu, văn bản nào sau đây, trừ trường hợp có quy định cụ thể tại hồ sơ mời thầu?", options: ["Tài liệu chứng minh năng lực, kinh nghiệm của nhà thầu", "Đơn dự thầu", "Thỏa thuận liên danh", "Giấy phép bán hàng"], answer: "Giấy phép bán hàng" },
            { question: "Đối với gói thầu xây lắp, khi nào nhà thầu không được phép thay thế nhân sự chủ chốt trong hồ sơ dự thầu?", options: ["Khi nhân sự nhà thầu chào trong HSDT không đáp ứng yêu cầu", "Khi nhân sự chuyển công tác", "Khi nhân sự bị ốm", "Trong mọi trường hợp nếu kê khai nhân sự không trung thực"], answer: "Trong mọi trường hợp nếu kê khai nhân sự không trung thực" },
            { question: "Trong gói thầu dịch vụ tư vấn, thông tin về uy tín của nhà thầu được sử dụng để", options: ["Đánh giá về kỹ thuật", "Đánh giá về năng lực, kinh nghiệm", "Đánh giá tư cách hợp lệ của nhà thầu", "Loại nhà thầu đã bị đánh giá về uy tín"], answer: "Đánh giá về kỹ thuật" },
            { question: "Gói thầu lĩnh vực dịch vụ tư vấn, sử dụng thang điểm 1.000 để xây dựng tiêu chuẩn đánh giá về kỹ thuật, vậy số điểm đối với tiêu chí đánh giá về uy tín của nhà thầu là bao nhiêu điểm:", options: ["50 điểm", "Tối thiểu 100 điểm", "Tối thiểu 50 điểm", "100 điểm"], answer: "50 điểm" },
            { question: "Một nhà thầu bị phát hiện cố tình kê khai thông tin không trung thực trong hồ sơ dự thầu làm sai lệch kết quả gói thầu", options: ["Bị cấm tham gia hoạt động đấu thầu", "Bị đăng tải thông tin vi phạm trên cổng thông tin điện tử của Chính Phủ", "Bị phạt tiền", "Bị cảnh cáo"], answer: "Bị cấm tham gia hoạt động đấu thầu" },
            { question: "Việc đánh giá hồ sơ dự thầu phải căn cứ vào:", options: ["Tiêu chuẩn đánh giá hồ sơ dự thầu", "Yêu cầu khác trong hồ sơ mời thầu", "Hồ sơ dự thầu đã nộp", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Trường hợp nhà thầu có thư giảm giá, việc sửa lỗi và hiệu chỉnh sai lệch được thực hiện trên cơ sở nào?", options: ["Giá dự thầu chưa trừ đi giá trị giảm giá", "Giá dự thầu chưa bao gồm thuế", "Giá dự thầu đã cộng thêm thuế", "Giá dự thầu đã trừ giá trị giảm giá"], answer: "Giá dự thầu chưa trừ đi giá trị giảm giá" },
            { question: "Doanh nghiệp nhà nước A là tập đoàn kinh tế nhà nước hiện đang tổ chức 01 gói thầu hỗn hợp PC (xây lắp và cung cấp, lắp đặt thiết bị). Tình huống: công ty xây lắp X là doanh nghiệp do Tập đoàn A thành lập và nắm giữ 70 % vốn điều lệ tham dự gói thầu nêu trên. Việc đánh giá tiêu chí đảm bảo cạnh tranh trong đấu thầu như thế nào?", options: ["Nếu công ty X đáp ứng các yêu cầu về bảo đảm cạnh tranh với các đơn vị tư vấn của gói thầu thì Công ty X được phép tham dự thầu", "Công ty X không đáp ứng yêu cầu về đảm bảo cạnh tranh trong đấu thầu.", "Công ty X luôn được phép tham dự thầu và luôn được đánh giá đảm bảo cạnh tranh trong đấu thầu.", "Công ty X đáp ứng yêu cầu về đảm bảo cạnh tranh trong đấu thầu."], answer: "Nếu công ty X đáp ứng các yêu cầu về bảo đảm cạnh tranh với các đơn vị tư vấn của gói thầu thì Công ty X được phép tham dự thầu" },
            { question: "Kế hoạch tổng thể lựa chọn nhà thầu cho dự án phải bao gồm nội dung nào sau đây?", options: ["Đánh giá năng lực, nguồn lực và kinh nghiệm của chủ đầu tư", "Phân tích thị trường và xác định rủi ro trong đấu thầu", "Bối cảnh thực hiện dự án đối với công tác đấu thầu", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Khi có bằng chứng tổ chức, cá nhân tham gia hoạt động đấu thầu có hành vi vi phạm... người có thẩm quyền thực hiện biện pháp nào sau đây?", options: ["Đình chỉ cuộc thầu", "Không công nhận kết quả lựa chọn nhà thầu", "Xử lý vi phạm trong đấu thầu", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Kế hoạch tổng thể lựa chọn nhà thầu cho dự án phải bao gồm nội dung nào sau đây? (Câu hỏi thêm 1)", options: ["Đánh giá năng lực, nguồn lực và kinh nghiệm của chủ đầu tư", "Phân tích thị trường và xác định rủi ro trong đấu thầu", "Bối cảnh thực hiện dự án đối với công tác đấu thầu", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Khi có bằng chứng tổ chức, cá nhân tham gia hoạt động đấu thầu có hành vi vi phạm... người có thẩm quyền thực hiện biện pháp nào sau đây? (Câu hỏi thêm 2)", options: ["Đình chỉ cuộc thầu", "Không công nhận kết quả lựa chọn nhà thầu", "Xử lý vi phạm trong đấu thầu", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" }
        ]
    },
    exam2: {
        title: "Bài Thi Trắc Nghiệm số 2",
        questions: [
            { question: "Nhà thầu tham dự thầu gói thầu mua sắm hàng hóa phải độc lập về pháp lý và tài chính với bên nào sau đây?", options: ["Nhà thầu phụ cùng tham dự thầu gói thầu đó", "Chủ đầu tư", "Nhà cung cấp vật tư", "Nhà thầu khác cùng tham dự thầu"], answer: "Chủ đầu tư" },
            { question: "Trường hợp Chủ đầu tư giao cho Tổ thẩm định thực hiện việc thẩm định kết quả lựa chọn nhà thầu, chi phí thẩm định kết quả lựa chọn nhà thầu bằng bao nhiêu phần trăm giá gói thầu?", options: ["0,1%", "0,05%", "0,2%", "0,15%"], answer: "0,1%" },
            { question: "Trường hợp Chủ đầu tư giao cho Tổ chuyên gia thực hiện việc đánh giá hồ sơ dự thầu, chi phí đánh giá hồ sơ dự thầu bằng bao nhiêu phần trăm giá gói thầu?", options: ["0,2%", "0,3%", "0,1%", "0,5%"], answer: "0,2%" },
            { question: "Trường hợp Chủ đầu tư giao cho Tổ thẩm định thực hiện việc thẩm định hồ sơ mời thầu, chi phí thẩm định Hồ sơ mời thầu bằng bao nhiêu phần trăm giá gói thầu?", options: ["0,3%", "0,5%", "0,2%", "0,1%"], answer: "0,1%" },
            { question: "Thời hạn xử lý hồ sơ đăng ký tài khoản trên Hệ thống mạng đấu thầu quốc gia là bao lâu?", options: ["02 ngày làm việc", "03 ngày làm việc", "05 ngày làm việc", "01 ngày làm việc"], answer: "02 ngày làm việc" },
            { question: "Chủ đầu tư chịu trách nhiệm đăng tải kế hoạch tổng thể lựa chọn nhà thầu trên Hệ thống mạng đấu thầu quốc gia trong thời hạn bao lâu kể từ ngày văn bản được ban hành?", options: ["03 ngày làm việc", "10 ngày", "05 ngày làm việc", "01 ngày làm việc"], answer: "05 ngày làm việc" },
            { question: "Nhà thầu trong nước được chuyển giao công nghệ để sản xuất hàng hóa có xuất xứ Việt Nam được hưởng ưu đãi trong thời hạn bao nhiêu năm kể từ khi sản phẩm lần đầu được sản xuất?", options: ["05 năm", "03 năm", "07 năm", "10 năm"], answer: "05 năm" },
            { question: "Thời hạn áp dụng thỏa thuận khung trong mua sắm tập trung tối đa là bao nhiêu tháng?", options: ["60 tháng", "24 tháng", "36 tháng", "12 tháng"], answer: "36 tháng" },
            { question: "Tổng mức chi cho Hội đồng tư vấn giải quyết kiến nghị của nhà thầu không được vượt quá:", options: ["Số tiền nhà thầu có kiến nghị đã nộp", "150% số tiền nhà thầu nộp", "50% số tiền nhà thầu nộp", "70% số tiền nhà thầu nộp"], answer: "Số tiền nhà thầu có kiến nghị đã nộp" },
            { question: "Hồ sơ dự thầu gói thầu tư vấn bắt buộc phải có tài liệu, văn bản nào sau đây, trừ trường hợp có quy định cụ thể tại hồ sơ mời thầu?", options: ["Giấy phép bán hàng", "Thỏa thuận liên danh", "Đơn dự thầu", "Bảo đảm dự thầu"], answer: "Đơn dự thầu" },
            { question: "Đặc điểm của phương thức hai giai đoạn hai túi hồ sơ là gì?", options: ["Chỉ mở một lần đối với toàn bộ hồ sơ dự thầu", "Chỉ áp dụng cho gói thầu tư vấn đơn giản", "Áp dụng cho gói thầu mua sắm hàng hóa, xây lắp, hỗn hợp có kỹ thuật, công nghệ mới, phức tạp, có tính đặc thù", "Chỉ áp dụng cho đấu thầu hạn chế trong nước"], answer: "Áp dụng cho gói thầu mua sắm hàng hóa, xây lắp, hỗn hợp có kỹ thuật, công nghệ mới, phức tạp, có tính đặc thù" },
            { question: "Giá gói thầu được tính đúng, đủ toàn bộ chi phí để thực hiện gói thầu, kể cả:", options: ["Chi phí dự phòng", "Phí, lệ phí và thuế", "Tùy chọn mua thêm", "Đáp án A và B"], answer: "Đáp án A và B" },
            { question: "Đối với gói thầu cung cấp dịch vụ phi tư vấn, mua sắm hàng hóa, xây lắp, hỗn hợp, nhà thầu được xem xét, đề nghị trúng thầu khi đáp ứng điều kiện nào sau đây?", options: ["Có hồ sơ dự thầu, hồ sơ đề xuất hợp lệ", "Có năng lực, kinh nghiệm đáp ứng yêu cầu của hồ sơ mời thầu, hồ sơ yêu cầu", "Có giá đề nghị trúng thầu không vượt giá gói thầu được phê duyệt", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Phương thức một giai đoạn một túi hồ sơ KHÔNG áp dụng cho trường hợp nào?", options: ["Chỉ định thầu xây lắp công trình", "Đấu thầu rộng rãi mua sắm hàng hóa", "Chào hàng cạnh tranh dịch vụ phi tư vấn", "Đấu thầu rộng rãi gói thầu tư vấn"], answer: "Đấu thầu rộng rãi gói thầu tư vấn" },
            { question: "Phương thức một giai đoạn hai túi hồ sơ được áp dụng trong trường hợp nào sau đây?", options: ["Chỉ định thầu đối với gói thầu xây lắp", "Mua sắm trực tiếp đối với mua sắm hàng hóa", "Chào hàng cạnh tranh đối với gói thầu xây lắp", "Đấu thầu rộng rãi, đấu thầu hạn chế đối với gói thầu mua sắm hàng hóa có công nghệ cao, công nghệ chiến lược"], answer: "Đấu thầu rộng rãi, đấu thầu hạn chế đối với gói thầu mua sắm hàng hóa có công nghệ cao, công nghệ chiến lược" },
            { question: "Từ ngày 01/01/2025, đấu thầu qua mạng được áp dụng bắt buộc đối với hình thức nào?", options: ["Đàm phán giá", "Đấu thầu rộng rãi, đấu thầu hạn chế, chào hàng cạnh tranh trong nước", "Chỉ định thầu quốc tế", "Mua sắm trực tiếp"], answer: "Đấu thầu rộng rãi, đấu thầu hạn chế, chào hàng cạnh tranh trong nước" },
            { question: "Khi phát hiện hành vi vi phạm dẫn đến sai lệch kết quả lựa chọn nhà thầu, Chủ đầu tư có thể thực hiện biện pháp nào?", options: ["Đình chỉ cuộc thầu", "Không công nhận kết quả lựa chọn nhà thầu", "Xử lý vi phạm trong đấu thầu", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Hội đồng tư vấn khoản chi cho các thành viên Hội đồng tư vấn... Trường hợp nhà thầu rút đơn kiến nghị sau khi Hội đồng tư vấn đã tổ chức họp thì:", options: ["Không được hoàn trả chi phí giải quyết kiến nghị", "Được hoàn trả 100% chi phí đã nộp", "Được hoàn trả 50% chi phí đã nộp", "Không bị xử lý gì"], answer: "Không được hoàn trả chi phí giải quyết kiến nghị" },
            { question: "Giá trị bảo đảm thực hiện hợp đồng?", options: ["Do Chủ đầu tư quyết định", "2-10% giá gói thầu", "2-10% giá hợp đồng", "2-3% giá gói thầu"], answer: "2-10% giá hợp đồng" },
            { question: "Hợp đồng theo đơn giá điều chỉnh được áp dụng trong trường hợp nào?", options: ["Gói thầu có thể xác định rõ giá trị hợp đồng ngay từ đầu", "Gói thầu có thời gian thực hiện dài và có rủi ro biến động giá đối với các chi phí đầu vào", "Gói thầu có thời gian thực hiện ngắn, giá cả ổn định", "Gói thầu bảo hiểm công trình"], answer: "Gói thầu có thời gian thực hiện dài và có rủi ro biến động giá đối với các chi phí đầu vào" },
            { question: "Phương pháp giá thấp nhất thường được áp dụng trong trường hợp nào sau đây?", options: ["Gói thầu hỗn hợp có nhiều phương án kỹ thuật", "Gói thầu có nhiều yếu tố kỹ thuật khác biệt", "Gói thầu mà các đề xuất về kỹ thuật, tài chính, thương mại được coi là cùng một mặt bằng khi đáp ứng các yêu cầu của hồ sơ mời thầu", "Gói thầu chỉ có một nhà thầu tham dự"], answer: "Gói thầu mà các đề xuất về kỹ thuật, tài chính, thương mại được coi là cùng một mặt bằng khi đáp ứng các yêu cầu của hồ sơ mời thầu" },
            { question: "Phương pháp giá cố định trong đánh giá hồ sơ dự thầu gói thầu tư vấn được áp dụng khi nào?", options: ["Gói thầu tư vấn đơn giản, phạm vi công việc xác định chính xác, chi phí hợp lý, cụ thể và cố định", "Gói thầu tư vấn có quy trình thực hiện phức tạp", "Gói thầu tư vấn áp dụng đấu thầu quốc tế", "Gói thầu tư vấn có nhiều phương án kỹ thuật"], answer: "Gói thầu tư vấn đơn giản, phạm vi công việc xác định chính xác, chi phí hợp lý, cụ thể và cố định" },
            { question: "Điều kiện nào sau đây KHÔNG phải là điều kiện áp dụng mua sắm tập trung?", options: ["Chỉ áp dụng cho hàng hóa nhập khẩu", "Có thể áp dụng cho thuốc hiếm, thuốc cần mua với số lượng ít", "Thuộc danh mục hàng hóa, dịch vụ áp dụng mua sắm tập trung do cơ quan có thẩm quyền ban hành", "Hàng hóa, dịch vụ cần mua sắm với số lượng lớn, chủng loại tương tự ở một hoặc nhiều cơ quan, tổ chức, đơn vị"], answer: "Chỉ áp dụng cho hàng hóa nhập khẩu" },
            { question: "Loại hợp đồng nào phù hợp nhất khi phạm vi công việc, yêu cầu kỹ thuật, thời gian thực hiện gói thầu đã xác định rõ.", options: ["Hợp đồng theo chi phí cộng phí", "Hợp đồng theo thời gian", "Hợp đồng theo đơn giá cố định", "Hợp đồng trọn gói"], answer: "Hợp đồng trọn gói" },
            { question: "Khi nào áp dụng hợp đồng theo đơn giá cố định?", options: ["Khi chưa xác định được rõ ràng bản chất công việc", "Khi phạm vi công việc có thể thay đổi lớn", "Khi bản chất công việc đã xác định rõ nhưng chưa xác định được chính xác số lượng, khối lượng công việc thực tế", "Khi cần thanh toán theo kết quả đầu ra"], answer: "Khi bản chất công việc đã xác định rõ nhưng chưa xác định được chính xác số lượng, khối lượng công việc thực tế" },
            { question: "Khi nào được áp dụng hình thức đặt hàng, giao nhiệm vụ khi lựa chọn nhà thầu cung cấp sản phẩm, dịch vụ công?", options: ["Khi cung cấp sản phẩm, dịch vụ công ích", "Khi cung cấp dịch vụ sự nghiệp công", "Khi Pháp luật quản lý ngành có quy định", "Cả 3 phương án trên"], answer: "Cả 3 phương án trên" },
            { question: "Đấu thầu hạn chế được áp dụng khi nào?", options: ["Khi nhà tài trợ yêu cầu tổ chức đấu thầu quốc tế", "Khi chủ đầu tư muốn rút ngắn thời gian đấu thầu", "Khi gói thầu có yêu cầu kỹ thuật cao hoặc đặc thù mà chỉ một số nhà thầu đáp ứng", "Khi gói thầu có giá trị trên 100 tỷ đồng"], answer: "Khi gói thầu có yêu cầu kỹ thuật cao hoặc đặc thù mà chỉ một số nhà thầu đáp ứng" },
            { question: "Chủ đầu tư phải cập nhật tiến độ thực tế thực hiện hợp đồng khi nào?", options: ["Khi có yêu cầu của cơ quan quản lý", "Khi hợp đồng kết thúc", "Khi thực hiện xong các mốc hoàn thành quy định trong hợp đồng", "Khi có yêu cầu của nhà thầu"], answer: "Khi thực hiện xong các mốc hoàn thành quy định trong hợp đồng" },
            { question: "Khi nào nhà thầu nước ngoài không phải liên danh với nhà thầu trong nước hoặc không phải sử dụng nhà thầu phụ trong nước?", options: ["Khi nhà thầu trong nước không đủ năng lực tham gia vào bất kỳ phần công việc nào của gói thầu", "Khi nhà thầu nước ngoài có đủ năng lực thực hiện gói thầu", "Khi nhà thầu nước ngoài có vốn góp tại Việt Nam", "Khi dự án thuộc lĩnh vực công nghệ cao"], answer: "Khi nhà thầu trong nước không đủ năng lực tham gia vào bất kỳ phần công việc nào của gói thầu" },
            { question: "Đối với gói thầu xây lắp, mua sắm hàng hóa, dịch vụ phi tư vấn, khi nào nhà thầu không được phép thay thế nhân sự chủ chốt trong hồ sơ dự thầu?", options: ["Khi nhân sự chuyển công tác", "Trong mọi trường hợp nếu kê khai nhân sự không trung thực", "Khi nhân sự không đáp ứng yêu cầu", "Vì lý do bất khảng kháng"], answer: "Trong mọi trường hợp nếu kê khai nhân sự không trung thực" },
            { question: "Trường hợp cần điều chỉnh hình thức lựa chọn nhà thầu do thay đổi giá gói thầu, chủ đầu tư phải làm gì?", options: ["Thông báo cho nhà thầu", "Không cần điều chỉnh", "Điều chỉnh KHLCNT", "Hủy thầu"], answer: "Điều chỉnh KHLCNT" },
            { question: "Trường hợp tất cả các nhà thầu tham dự thầu đều được hưởng ưu đãi như nhau thì:", options: ["Vẫn phải cộng ưu đãi vào giá dự thầu", "Chỉ tính ưu đãi cho nhà thầu trong nước", "Chỉ tính ưu đãi cho nhà thầu có giá thấp nhất", "Không cần tính ưu đãi để so sánh, xếp hạng"], answer: "Không cần tính ưu đãi để so sánh, xếp hạng" },
            { question: "Trường hợp nhà thầu có kiến nghị được kết luận là đúng thì:", options: ["Được hoàn trả 50% chi phí", "Không bị ảnh hưởng gì", "Được hoàn trả toàn bộ chi phí giải quyết kiến nghị", "Không được hoàn trả chi phí"], answer: "Được hoàn trả toàn bộ chi phí giải quyết kiến nghị" },
            { question: "Chủ đầu tư có trách nhiệm gì khi thực hiện hợp đồng?", options: ["Không điều chỉnh hợp đồng", "Quản lý tiến độ, chất lượng, chi phí và các nội dung khác của hợp đồng", "Không thay đổi tiến độ", "Không thay đổi giá hợp đồng"], answer: "Quản lý tiến độ, chất lượng, chi phí và các nội dung khác của hợp đồng" },
            { question: "Đối với gói thầu xây lắp, mua sắm hàng hóa, dịch vụ phi tư vấn, trường hợp hợp đồng tương tự mà nhà thầu đề xuất không đáp ứng yêu cầu, tổ chuyên gia xử lý như thế nào?", options: ["Không cho phép bổ sung, thay thế hợp đồng tương tự khác", "Có văn bản gửi Chủ đầu tư để đề nghị nhà thầu làm rõ hồ sơ dự thầu, cho phép bổ sung, thay thế hợp đồng tương tự khác để đánh giá", "Xin ý kiến của Chủ đầu tư", "Loại bỏ hồ sơ dự thầu của nhà thầu"], answer: "Có văn bản gửi Chủ đầu tư để đề nghị nhà thầu làm rõ hồ sơ dự thầu, cho phép bổ sung, thay thế hợp đồng tương tự khác để đánh giá" },
            { question: "Cơ sở khám bệnh, chữa bệnh có thể lựa chọn nhà thầu cung cấp hóa chất, vật tư xét nghiệm, thiết bị y tế theo cách thức nào sau đây?", options: ["Lựa chọn nhà thầu cung cấp hóa chất, vật tư xét nghiệm và nhà thầu trúng thầu chịu trách nhiệm cung cấp thiết bị y tế", "Lựa chọn nhà thầu theo số lượng dịch vụ kỹ thuật", "Lựa chọn nhà thầu thực hiện gói thầu cung cấp thiết bị y tế, hóa chất, vật tư xét nghiệm", "Tất cả các đáp án trên"], answer: "Tất cả các đáp án trên" },
            { question: "Nhà thầu tham dự gói thầu chìa khóa trao tay phải độc lập về pháp lý và tài chính với bên nào?", options: ["Nhà thầu cung cấp hàng hóa khác cho chủ đầu tư", "Nhà thầu phụ", "Nhà thầu cung cấp vật tư", "Nhà thầu lập, thẩm tra báo cáo nghiên cứu tiền khả thi"], answer: "Nhà thầu lập, thẩm tra báo cáo nghiên cứu tiền khả thi" },
            { question: "Sản phẩm, dịch vụ công là gì?", options: ["Sản phẩm, dịch vụ thiết yếu đối với đời sống kinh tế - xã hội hoặc bảo đảm quốc phòng, an ninh", "Bao gồm sản phẩm, dịch vụ công ích và dịch vụ sự nghiệp công", "Đáp án A và B đều đúng", "Gồm sản phẩm, dịch vụ công ích và sản phẩm công"], answer: "Đáp án A và B đều đúng" },
            { question: "Hợp đồng theo thời gian thường áp dụng cho loại công việc nào?", options: ["Xây lắp công trình lớn", "Đầu tư phát triển công nghệ cao", "Sửa chữa, bảo trì công trình, máy móc, thiết bị hoặc dịch vụ tư vấn khó xác định phạm vi và thời gian", "Mua sắm hàng hóa thông dụng"], answer: "Sửa chữa, bảo trì công trình, máy móc, thiết bị hoặc dịch vụ tư vấn khó xác định phạm vi và thời gian" },
            { question: "Trường hợp đấu thầu quốc tế, chi phí dịch tài liệu được tính như thế nào?", options: ["Theo quy định của Bộ Tài chính", "Theo quy định của chủ đầu tư", "Theo giá cố định", "Phù hợp với giá thị trường, bảo đảm hiệu quả của gói thầu"], answer: "Phù hợp với giá thị trường, bảo đảm hiệu quả của gói thầu" },
            { question: "Cơ sở dữ liệu quốc gia về nhà thầu bao gồm thông tin nào sau đây?", options: ["Thông tin về địa chỉ nhà thầu", "Thông tin về năng lực, kinh nghiệm của nhà thầu", "Thông tin về hợp đồng lao động cá nhân", "Thông tin về số lượng lao động"], answer: "Thông tin về năng lực, kinh nghiệm của nhà thầu" },
            { question: "Đấu thầu trước được áp dụng trong trường hợp nào?", options: ["Khi đã có quyết định phê duyệt dự án đầu tư", "Thực hiện trước một số thủ tục trước khi điều ước quốc tế, thỏa thuận vay nước ngoài được ký kết hoặc trước khi dự án được phê duyệt đầu tư", "Khi đã có hợp đồng ký kết với nhà thầu", "Khi dự án đã hoàn thành"], answer: "Thực hiện trước một số thủ tục trước khi điều ước quốc tế, thỏa thuận vay nước ngoài được ký kết hoặc trước khi dự án được phê duyệt đầu tư" },
            { question: "Ngôn ngữ sử dụng trong đấu thầu quốc tế là gì?", options: ["Tiếng Anh hoặc song ngữ tiếng Việt và tiếng Anh", "Tiếng Việt", "Tiếng Nga", "Tiếng Anh"], answer: "Tiếng Anh hoặc song ngữ tiếng Việt và tiếng Anh" },
            { question: "Nếu phát sinh tình huống chưa được quy định cụ thể trong Luật, chủ đầu tư xử lý thế nào?", options: ["Hủy thầu", "Xin ý kiến Sở Tài chính", "Quyết định và chịu trách nhiệm, bảo đảm cạnh tranh, minh bạch, hiệu quả, kinh tế và trách nhiệm giải trình", "Xin ý kiến cơ quan chủ quản"], answer: "Quyết định và chịu trách nhiệm, bảo đảm cạnh tranh, minh bạch, hiệu quả, kinh tế và trách nhiệm giải trình" },
            { question: "Khi E-HSMT có yêu cầu cung cấp hàng mẫu, nhà thầu được nộp bổ sung hàng mẫu trong thời hạn bao lâu sau thời điểm đóng thầu?", options: ["3 ngày làm việc", "2 ngày làm việc", "5 ngày làm việc", "7 ngày làm việc"], answer: "5 ngày làm việc" },
            { question: "Chủ đầu tư phát hành bản giấy hồ sơ mời quan tâm cho nhà thầu có giá trị pháp lý không?", options: ["Tùy từng trường hợp", "Chỉ có giá trị nếu có chữ ký số", "Không có giá trị pháp lý", "Có giá trị pháp lý"], answer: "Không có giá trị pháp lý" },
            { question: "Đối với gói thầu mua sắm hàng hóa, phải công khai chi tiết thông tin về các hạng mục hàng hóa trúng thầu, trừ nội dung nào?", options: ["Danh mục hàng hóa", "Mã số thuế nhà thầu", "Đơn giá trúng thầu", "Ký mã hiệu"], answer: "Mã số thuế nhà thầu" },
            { question: "Chứng thư số sử dụng trên Hệ thống phải đáp ứng điều kiện nào?", options: ["Do tổ chức cung cấp dịch vụ chứng thực chữ ký số công cộng cấp", "Do tổ chức cung cấp dịch vụ chứng thực chữ ký số chuyên dùng Chính phủ cấp", "Một trong hai đáp án A hoặc B", "Do bất kỳ tổ chức nào cấp"], answer: "Một trong hai đáp án A hoặc B" },
            { question: "File đăng tải trên Hệ thống phải đáp ứng yêu cầu nào sau đây?", options: ["Chỉ duyệt file PDF", "Được mã hóa riêng", "Được nén bằng phần mềm bất kỳ", "Không bị nhiễm virus, không bị lỗi, hỏng và không thiết lập mật khẩu"], answer: "Không bị nhiễm virus, không bị lỗi, hỏng và không thiết lập mật khẩu" },
            { question: "Nếu file đính kèm trong hồ sơ mời thầu không mở được, Chủ đầu tư phải làm gì?", options: ["Chỉ sửa file đính kèm bị lỗi và đăng tải, phát hành lại file này", "Đăng tải và phát hành lại toàn bộ hồ sơ mời thầu", "Gửi email file đính kèm cho nhà thầu", "Huỷ thầu"], answer: "Đăng tải và phát hành lại toàn bộ hồ sơ mời thầu" },
            { question: "Nếu E-HSMT không đầy đủ thông tin hoặc không rõ ràng, chủ đầu tư thầu phải làm gì?", options: ["Không cần làm gì", "Sửa đổi, bổ sung và đăng tải lại E-HSMT", "Chỉ bổ sung bằng văn bản giấy", "Gửi thông báo cho nhà thầu"], answer: "Sửa đổi, bổ sung và đăng tải lại E-HSMT" },
            { question: "Văn bản điện tử trên Hệ thống KHÔNG bao gồm nội dung nào?", options: ["Biên bản mở thầu", "Văn bản hợp đồng giấy", "Quyết định phê duyệt E-HSMT", "Thông tin về dự án"], answer: "Văn bản hợp đồng giấy" },
            { question: "Nhà thầu có trách nhiệm gì khi phát hiện E-HSMT không rõ ràng, gây khó khăn cho việc chuẩn bị E-HSDT?", options: ["Yêu cầu Chủ đầu tư làm rõ để chủ đầu tư, sửa đổi, bổ sung tài liệu", "Tự tìm hiểu", "Từ chối tham dự thầu", "Không cần làm gì"], answer: "Yêu cầu Chủ đầu tư làm rõ để chủ đầu tư, sửa đổi, bổ sung tài liệu" },
            { question: "File đính kèm trong E-HSDT không đáp ứng định dạng quy định sẽ được xử lý như thế nào?", options: ["Vẫn được xem xét, đánh giá", "Được đánh giá lại sau", "Không được xem xét, đánh giá", "Chỉ xem xét một phần"], answer: "Không được xem xét, đánh giá" },
            { question: "Tiêu chuẩn đánh giá về kỹ thuật đối với gói thầu xây lắp có thể sử dụng phương pháp nào?", options: ["Đạt, không đạt", "Chấm điểm", "Đáp án A và B đều đúng", "Tất cả các đáp án trên đều sai"], answer: "Đáp án A và B đều đúng" },
            { question: "Trường hợp có nghi ngờ về tính xác thực của các tài liệu do nhà thầu cung cấp, Chủ đầu tư được làm gì?", options: ["Xác minh với các tổ chức, cá nhân có liên quan đến nội dung của tài liệu", "Chấp nhận và tiếp tục đánh giá theo HSDT đã nộp", "Loại bỏ nhà thầu", "Yêu cầu nhà thầu là rõ tại bước hoàn thiện hợp đồng"], answer: "Xác minh với các tổ chức, cá nhân có liên quan đến nội dung của tài liệu" },
            { question: "Hồ sơ dự thầu không bắt buộc phải có tài liệu, văn bản nào sau đây, trừ trường hợp có quy định cụ thể tại hồ sơ mời thầu?", options: ["Giấy phép bán hàng", "Bản gốc hồ sơ dự thầu", "Đơn dự thầu", "Giá dự thầu"], answer: "Giấy phép bán hàng" },
            { question: "Phương pháp giá thấp nhất thường được áp dụng trong trường hợp nào sau đây?", options: ["Gói thầu hỗn hợp có nhiều phương án kỹ thuật", "Gói thầu mà các đề xuất về kỹ thuật, tài chính, thương mại được coi là cùng một mặt bằng khi đáp ứng các yêu cầu của hồ sơ mời thầu", "Gói thầu chỉ có một nhà thầu tham dự", "Gói thầu có nhiều yếu tố kỹ thuật khác biệt, đặc thù"], answer: "Gói thầu mà các đề xuất về kỹ thuật, tài chính, thương mại được coi là cùng một mặt bằng khi đáp ứng các yêu cầu của hồ sơ mời thầu" },
            { question: "Trong đấu thầu quốc tế, đồng tiền dự thầu tối đa được phép quy định trong hồ sơ mời thầu là bao nhiêu loại?", options: ["2 loại đồng tiền", "4 loại đồng tiền", "1 loại đồng tiền", "3 loại đồng tiền"], answer: "3 loại đồng tiền" }
        ]
    },
        exam3: {
        title: "Bài Thi Trắc Nghiệm số 3",
        questions: [
            // --- BẮT ĐẦU 50 CÂU HỎI BÀI THI SỐ 3 ---
            { question: "Theo quy định pháp luật về đấu thầu, hàng hóa gồm?", options: ["Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng; sản phẩm, phương tiện, hàng tiêu dùng, phần mềm thương mại", "Thuốc, hóa chất, vật tư xét nghiệm, thiết bị y tế", "Phương án A và B đều đúng", "Logistics, bảo hiểm, quảng cáo, nghiệm thu chạy thử, chụp ảnh vệ tinh"], answer: "Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng; sản phẩm, phương tiện, hàng tiêu dùng, phần mềm thương mại" },
            { question: "Chọn phương án đúng về phạm vi điều chỉnh của Luật Đấu thầu?", options: ["Quy định về quản lý nhà nước đối với hoạt động đấu thầu", "Quy định về thẩm quyền và trách nhiệm của các cơ quan, tổ chức, cá nhân trong hoạt động đấu thầu", "Quy định về hoạt động lựa chọn nhà thầu thực hiện gói thầu, hoạt động lựa chọn nhà đầu tư thực hiện dự án đầu tư kinh doanh", "Tất cả phương án trên đều đúng"], answer: "Quy định về quản lý nhà nước đối với hoạt động đấu thầu" },
            { question: "Trường hợp nào sau đây không thuộc đối tượng áp dụng của Luật Đấu thầu?", options: ["Gói thầu mua thuốc, hoá chất, vật tư xét nghiệm sử dụng nguồn ngân sách nhà nước của bệnh viện công lập A", "Gói thầu xây dựng đường giao thông sử dụng vốn đầu tư công do Ban Quản lý dự án đầu tư xây dựng công trình tỉnh A làm chủ đầu tư", "Gói thầu mua sắm trang thiết bị làm việc sử dụng vốn nhà nước của Văn phòng UBND tỉnh A", "Hoạt động mua phần mềm kế toán của hộ kinh doanh cá thể"], answer: "Gói thầu mua thuốc, hoá chất, vật tư xét nghiệm sử dụng nguồn ngân sách nhà nước của bệnh viện công lập A" },
            { question: "Theo quy định pháp luật về đấu thầu, gói thầu nào được xếp vào gói thầu cung cấp dịch vụ tư vấn?", options: ["Thiết kế và cung cấp hệ thống xử lý nước thải", "Gói thầu lập nhiệm vụ quy hoạch vùng", "Gói thầu quảng cáo trên nền tảng xã hội và phát sóng trên VTV", "Gói thầu mua phần mềm kế toán MISA"], answer: "Thiết kế và cung cấp hệ thống xử lý nước thải" },
            { question: "Gói thầu nào là gói thầu cung cấp dịch vụ phi tư vấn?", options: ["Gói thầu in sổ công tác của tỉnh A", "Gói thầu thuê kiểm toán dự án", "Gói thầu mua phần mềm kế toán hỗ trợ doanh nghiệp khởi nghiệp sáng tạo, doanh nghiệp nhỏ do phụ nữ làm chủ", "Gói thầu xây dựng trụ sở làm việc của tỉnh A"], answer: "Gói thầu in sổ công tác của tỉnh A" },
            { question: "Theo quy định pháp luật về đấu thầu, đấu thầu là gì?", options: ["Là quá trình lựa chọn nhà thầu để ký kết, thực hiện hợp đồng cung cấp dịch vụ tư vấn, dịch vụ phi tư vấn, mua sắm hàng hóa, xây lắp trên cơ sở bảo đảm cạnh tranh, công bằng, minh bạch, hiệu quả kinh tế và trách nhiệm giải trình", "Là quá trình lựa chọn nhà đầu tư để ký kết, thực hiện hợp đồng dự án đầu tư kinh doanh trên cơ sở bảo đảm cạnh tranh, công bằng, minh bạch, hiệu quả kinh tế và trách nhiệm giải trình", "Là quá trình lựa chọn đơn vị để thực hiện hợp đồng thông qua các quy trình, thủ tục do pháp luật đấu thầu quy định.", "Phương án A và B đều đúng"], answer: "Là quá trình lựa chọn nhà thầu để ký kết, thực hiện hợp đồng cung cấp dịch vụ tư vấn, dịch vụ phi tư vấn, mua sắm hàng hóa, xây lắp trên cơ sở bảo đảm cạnh tranh, công bằng, minh bạch, hiệu quả kinh tế và trách nhiệm giải trình" },
            { question: "Đấu thầu quốc tế là gì?", options: ["Là hoạt động đấu thầu mà nhà thầu trong nước, nước ngoài được tham dự thầu", "Là hoạt động đấu thầu mà nhà thầu trong nước, nước ngoài được tham dự thầu, trong đó nhà thầu trong nước bắt buộc phải liên danh với nhà thầu nước ngoài", "Là hoạt động đấu thầu chỉ nhà thầu quốc tế được phép tham dự thầu", "Là hoạt động đấu thầu chỉ nhà thầu trong nước được phép tham dự thầu"], answer: "Là hoạt động đấu thầu mà nhà thầu trong nước, nước ngoài được tham dự thầu" },
            { question: "Giá đề nghị trúng thầu là gì?", options: ["Là giá dự thầu của nhà thầu ghi trong quyết định phê duyệt kết quả lựa chọn nhà thầu.", "Là giá dự thầu của nhà thầu được đề nghị trúng thầu sau khi đã được sửa lỗi, hiệu chỉnh sai lệch theo yêu cầu của hồ sơ mời thầu, hồ sơ yêu cầu, trừ đi giá trị giảm giá (nếu có)", "Là giá dự thầu của nhà thầu chưa tính sửa lỗi, hiệu chỉnh sai lệch và giá trị giảm giá (nếu có)", "Là giá trị ghi trong hợp đồng giữa chủ đầu tư và nhà thầu"], answer: "Là giá dự thầu của nhà thầu ghi trong quyết định phê duyệt kết quả lựa chọn nhà thầu." },
            { question: "Theo quy định pháp luật về đấu thầu, hàng hóa gồm?", options: ["Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng; sản phẩm, phương tiện, hàng tiêu dùng, phần mềm thương mại", "Thuốc, hóa chất, vật tư xét nghiệm, thiết bị y tế", "Phương án A và B đều đúng", "Logistics, bảo hiểm, quảng cáo, nghiệm thu chạy thử, chụp ảnh vệ tinh"], answer: "Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng; sản phẩm, phương tiện, hàng tiêu dùng, phần mềm thương mại" },
            { question: "Đối tượng được hưởng ưu đãi trong lựa chọn nhà thầu là gì?", options: ["Hàng hóa có xuất xứ Việt Nam", "Nhà thầu trong nước sản xuất hàng hóa có xuất xứ Việt Nam phù hợp với hồ sơ mời thầu", "Sản phẩm, dịch vụ thân thiện môi trường theo quy định của pháp luật về bảo vệ môi trường", "Tất cả các phương án trên đều đúng"], answer: "Hàng hóa có xuất xứ Việt Nam" },
            { question: "Nhà thầu trong nước nào được hưởng ưu đãi trong lựa chọn nhà thầu?", options: ["Nhà thầu trong nước sản xuất hàng hóa có xuất xứ Việt Nam phù hợp với hồ sơ mời thầu", "Nhà thầu trong nước tham dự thầu với tư cách độc lập hoặc liên danh với nhà thầu trong nước khác khi tham dự đấu thầu", "Nhà thầu có sử dụng lao động nữ, thương binh, người khuyết tật hoặc người dân tộc thiểu số", "Tất cả các phương án trên đều đúng"], answer: "Nhà thầu trong nước sản xuất hàng hóa có xuất xứ Việt Nam phù hợp với hồ sơ mời thầu" },
            { question: "Trường hợp nào sau đây cơ quan, tổ chức, doanh nghiệp được tự quyết định việc lựa chọn nhà thầu trên cơ sở bảo đảm công khai, minh bạch, hiệu quả và trách nhiệm giải trình?", options: ["Thực hiện gói thầu thuộc dự án sử dụng vốn đầu tư công của cơ quan nhà nước", "Thực hiện gói thầu thuộc dự án sử dụng vốn đầu tư công của đơn vị sự nghiệp công lập bảo đảm một phần chi thường xuyên", "Thực hiện gói thầu thuộc dự án sử dụng vốn ngân sách nhà nước của doanh nghiệp nhà nước", "Lựa chọn nhà thầu của doanh nghiệp nhà nước không sử dụng vốn ngân sách nhà nước, đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên và chủ đầu tư, đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên không sử dụng ngân sách nhà nước"], answer: "Thực hiện gói thầu thuộc dự án sử dụng vốn đầu tư công của cơ quan nhà nước" },
            { question: "Điều kiện để tổ chức đấu thầu quốc tế lựa chọn nhà thầu thực hiện gói thầu mua sắm hàng hóa là gì?", options: ["Gói thầu mua sắm hàng hóa thông dụng, đơn giản, có sẵn trên thị trường", "Gói thầu mua sắm hàng hóa mà hàng hóa đó trong nước sản xuất được và đáp ứng các yêu cầu về kỹ thuật, chất lượng, giá nhưng chủ đầu tư yêu cầu phải mua hàng hóa nhập khẩu", "Gói thầu mua sắm hàng hóa mà hàng hóa đó trong nước không sản xuất được hoặc sản xuất được nhưng không đáp ứng một trong các yêu cầu về kỹ thuật, chất lượng, giá", "Gói thầu mua sắm hàng hóa thông dụng đã được nhập khẩu và chào bán tại Việt Nam nhưng hàng hóa đó trong nước không sản xuất được"], answer: "Gói thầu mua sắm hàng hóa thông dụng, đơn giản, có sẵn trên thị trường" },
            { question: "Ngôn ngữ sử dụng đối với đấu thầu quốc tế là gì?", options: ["Tiếng Việt", "Tiếng Đức", "Tiếng Anh hoặc tiếng Việt và tiếng Anh", "Bắt buộc cả tiếng Việt và tiếng Anh"], answer: "Tiếng Việt" },
            { question: "Đối với đấu thầu quốc tế, trường hợp ngôn ngữ sử dụng trong hồ sơ mời thầu là tiếng Việt và tiếng Anh thì khi tham dự thầu, nhà thầu sử dụng ngôn ngữ gì?", options: ["Tiếng Việt hoặc tiếng Anh", "Tiếng Việt", "Tiếng Anh", "Bắt buộc cả tiếng Việt và tiếng Anh"], answer: "Tiếng Việt hoặc tiếng Anh" },
            { question: "Trong trường hợp hủy thầu, toàn bộ hồ sơ liên quan đến quá trình lựa chọn nhà thầu của gói thầu đó có cần phải lưu trữ không?", options: ["Không cần lưu trữ, hủy hồ sơ ngay sau khi quyết định hủy thầu được ban hành nhưng phải đảm bảo thông tin không bị tiết lộ", "Không cần lưu trữ, trả lại hồ sơ cho nhà thầu theo nguyên trạng ngay sau khi quyết định hủy thầu được ban hành", "Có cần lưu trữ, trong thời hạn 05 năm kể từ ngày quyết định hủy thầu được ban hành", "Có cần lưu trữ, trong thời hạn 03 năm kể từ ngày quyết định hủy thầu được ban hành"], answer: "Không cần lưu trữ, hủy hồ sơ ngay sau khi quyết định hủy thầu được ban hành nhưng phải đảm bảo thông tin không bị tiết lộ" },
            { question: "Trường hợp hồ sơ đề xuất về tài chính của Nhà thầu không vượt qua bước đánh giá về kỹ thuật, Nhà thầu từ chối nhận lại hồ sơ đề xuất của mình thì Chủ đầu tư phải làm gì?", options: ["Chủ đầu tư xem xét, quyết định việc hủy hồ sơ nhưng phải đảm bảo thông tin không bị tiết lộ", "Chủ đầu tư phải lưu trữ theo quy định của pháp luật về lưu trữ", "Chủ đầu tư lưu trữ tối thiểu 05 năm", "Tất cả các phương án trên đều sai"], answer: "Chủ đầu tư xem xét, quyết định việc hủy hồ sơ nhưng phải đảm bảo thông tin không bị tiết lộ" },
            { question: "Hồ sơ hoàn công và quyết toán của gói thầu được lưu trữ theo quy định nào?", options: ["Quy định nội bộ của nhà thầu", "Quy định của tư vấn giám sát", "Quy định của pháp luật về lưu trữ", "Tất cả phương án trên đều sai"], answer: "Quy định nội bộ của nhà thầu" },
            { question: "Đối với gói thầu xây lắp đấu thầu không qua mạng, hồ sơ đề xuất tài chính của nhà thầu không được lựa chọn sẽ được trả lại khi nào?", options: ["Khi gửi thư mời thương thảo", "Khi kết thúc giai đoạn đánh giá kỹ thuật", "Khi hoàn trả bảo đảm dự thầu của nhà thầu không được lựa chọn hoặc đăng tải kết quả lựa chọn nhà thầu", "Khi ký hợp đồng"], answer: "Khi gửi thư mời thương thảo" },
            { question: "Đối với đấu thầu quốc tế, hồ sơ mời thầu được phát hành như thế nào?", options: ["HSMT được phát hành trên Hệ thống mạng đấu thầu quốc gia; Nhà thầu nộp tiền mua bản điện tử hồ sơ mời thầu khi nộp hồ sơ dự thầu", "HSMT được bán vào giờ hành chính từ thứ 2 tới thứ 6 tại địa chỉ do Chủ đầu tư quy định", "Phương án A và B đều đúng", "Phương án A và B đều sai"], answer: "HSMT được phát hành trên Hệ thống mạng đấu thầu quốc gia; Nhà thầu nộp tiền mua bản điện tử hồ sơ mời thầu khi nộp hồ sơ dự thầu" },
            { question: "Đối với gói thầu sử dụng vốn ngân sách nhà nước, tiền bán bản điện tử hồ sơ mời thầu, hồ sơ yêu cầu sẽ được xử lý như thế nào?", options: ["Sử dụng theo quy chế tài chính của chủ đầu tư", "Nộp vào ngân sách nhà nước theo quy định của Luật Ngân sách nhà nước", "Sử dụng theo cơ chế khoán chi", "Tất cả các đáp án trên đều sai"], answer: "Sử dụng theo quy chế tài chính của chủ đầu tư" },
            { question: "Chi phí đăng tải quyết định phê duyệt kế hoạch lựa chọn nhà thầu và quyết định phê duyệt kết quả lựa chọn nhà thầu lên Hệ thống mạng đấu thầu quốc gia đối với gói thầu chỉ định thầu là bao nhiêu?", options: ["220.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)", "330.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)", "Miễn phí", "110.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)"], answer: "220.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)" },
            { question: "Thành viên tổ chuyên gia cần có tối thiểu bao nhiêu năm kinh nghiệm trong lĩnh vực liên quan?", options: ["01 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "02 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "03 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "Không có quy định về số năm kinh nghiệm"], answer: "01 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu" },
            { question: "Bảo đảm cạnh tranh trong đấu thầu thuộc nội dung đánh giá về?", options: ["Tư cách hợp lệ", "Năng lực, kinh nghiệm", "Kỹ thuật", "Tài chính"], answer: "Tư cách hợp lệ" },
            { question: "Nhà thầu tham gia đấu thầu gói thầu hàng hóa phải độc lập với chủ thể nào sau đây?", options: ["Phải độc lập với nhà thầu tư vấn lập hồ sơ mời thầu gói thầu hàng hóa", "Phải độc lập với nhà thầu khác khi tham gia đấu thầu rộng rãi", "Phải độc lập với nhà thầu tư vấn lập kế hoạch tổng thể lựa chọn nhà thầu", "Phải độc lập với nhà thầu tư vấn lập kế hoạch lựa chọn nhà thầu"], answer: "Phải độc lập với nhà thầu tư vấn lập hồ sơ mời thầu gói thầu hàng hóa" },
            { question: "Nhận định nào sau đây không phù hợp với quy định về bảo đảm cạnh tranh trong đấu thầu?", options: ["Nhà thầu tham dự thầu phải độc lập với chủ đầu tư, trừ trường hợp: nhà thầu là đơn vị sự nghiệp công lập thuộc cơ quan quản lý nhà nước có chức năng, nhiệm vụ được giao phù hợp với tính chất gói thầu của cơ quan quản lý nhà nước đó, đơn vị sự nghiệp công lập và doanh nghiệp có cùng một cơ quan trực tiếp quản lý, góp vốn, các đơn vị sự nghiệp công lập có cùng một cơ quan trực tiếp quản lý", "Nhà thầu tham dự thầu phải độc lập với nhà thầu tư vấn quản lý dự án, tư vấn giám sát", "Nhà thầu tham dự thầu phải độc lập với nhà thầu tư vấn lập, thẩm tra, thẩm định hồ sơ thiết kế, dự toán", "Nhà thầu thực hiện hợp đồng phải độc lập với nhà thầu tư vấn lập kế hoạch lựa chọn nhà thầu."], answer: "Nhà thầu tham dự thầu phải độc lập với chủ đầu tư, trừ trường hợp: nhà thầu là đơn vị sự nghiệp công lập thuộc cơ quan quản lý nhà nước có chức năng, nhiệm vụ được giao phù hợp với tính chất gói thầu của cơ quan quản lý nhà nước đó, đơn vị sự nghiệp công lập và doanh nghiệp có cùng một cơ quan trực tiếp quản lý, góp vốn, các đơn vị sự nghiệp công lập có cùng một cơ quan trực tiếp quản lý" },
            { question: "Nội dung nào sau đây không thuộc quy định về bảo đảm cạnh tranh trong đấu thầu khi nhà thầu tham dự thầu đấu thầu rộng rãi gói thầu EPC, EP, EC?", options: ["Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra thiết kế FEED", "Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra báo cáo nghiên cứu khả thi trong trường hợp không lập thiết kế FEED", "Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra báo cáo kinh tế kỹ thuật trong trường hợp không lập báo cáo nghiên cứu khả thi, không lập thiết kế FEED theo quy định của pháp luật về xây dựng", "Nhà thầu tham dự thầu phải độc lập với nhà thầu khác cùng tham dự đấu thầu rộng rãi"], answer: "Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra thiết kế FEED" },
            { question: "Nội dung nào là nội dung đánh giá tính hợp lệ của hồ sơ dự thầu?", options: ["Nhân sự chủ chốt", "Hiệu lực của hồ sơ dự thầu", "Năng lực tài chính", "Việc thực hiện nghĩa vụ kê khai thuế, nộp thuế"], answer: "Nhân sự chủ chốt" },
            { question: "Nội dung nào không phải là tiêu chuẩn đánh giá về tính hợp lệ của hồ sơ dự thầu gói thầu tư vấn?", options: ["Hiệu lực của hồ sơ đề xuất về kỹ thuật đáp ứng yêu cầu theo quy định trong hồ sơ mời thầu", "Có bản gốc hồ sơ đề xuất về kỹ thuật", "Bảo đảm dự thầu hợp lệ", "Đã thực hiện nghĩa vụ kê khai thuế và nộp thuế"], answer: "Hiệu lực của hồ sơ đề xuất về kỹ thuật đáp ứng yêu cầu theo quy định trong hồ sơ mời thầu" },
            { question: "Đối với gói thầu mua sắm hàng hóa, xây lắp, phi tư vấn, phương pháp để đánh giá về năng lực và kinh nghiệm là?", options: ["Sử dụng tiêu chí đạt, không đạt", "Sử dụng phương pháp chấm điểm", "Kết hợp cả hai phương pháp tiêu chí đạt, không đạt và phương pháp chấm điểm", "Phương pháp dựa trên kỹ thuật"], answer: "Sử dụng tiêu chí đạt, không đạt" },
            { question: "Tiêu chuẩn đánh giá năng lực kinh nghiệm đối với gói thầu mua sắm hàng hóa bao gồm?", options: ["Doanh thu bình quân 3 năm gần nhất", "Giấy phép bán hàng của nhà sản xuất", "Số năm thành lập của doanh nghiệp", "Năng lực quản lý của doanh nghiệp"], answer: "Doanh thu bình quân 3 năm gần nhất" },
            { question: "Nội dung nào là tiêu chuẩn đánh giá về năng lực và kinh nghiệm không bắt buộc đối với gói thầu mua sắm hàng hóa?", options: ["Kinh nghiệm thực hiện hợp đồng cung cấp hàng hóa tương tự", "Giá trị tài sản ròng của nhà thầu", "Doanh thu của nhà thầu", "Việc thực hiện nghĩa vụ kê khai thuế, nộp thuế"], answer: "Kinh nghiệm thực hiện hợp đồng cung cấp hàng hóa tương tự" },
            { question: "Nội dung nào là tiêu chuẩn đánh giá về năng lực và kinh nghiệm bắt buộc đối với gói thầu xây lắp tổ chức đấu thầu rộng rãi không qua mạng?", options: ["Có bản gốc hồ sơ dự thầu", "Có tên trong danh sách ngắn", "Năng lực tài chính", "Có bảo đảm dự thầu hợp lệ"], answer: "Có bản gốc hồ sơ dự thầu" },
            { question: "Tiêu chuẩn đánh giá về kỹ thuật được yêu cầu về nhãn hiệu cho nguyên nhiên vật liệu, vật tư và các yếu tố đầu vào đối với trường hợp nào?", options: ["Nội dung công việc xây lắp thuộc gói thầu xây lắp, gói thầu EPC", "Nội dung công việc xây lắp thuộc gói thầu EPC", "Nội dung công việc xây lắp thuộc gói thầu EPC và gói thầu PC", "Nội dung công việc xây lắp thuộc gói thầu xây lắp và gói thầu PC"], answer: "Nội dung công việc xây lắp thuộc gói thầu xây lắp, gói thầu EPC" },
            { question: "Nội dung nào không phải là tiêu chuẩn đánh giá về kỹ thuật của gói thầu tư vấn?", options: ["Uy tín của nhà thầu thông qua việc tham dự thầu, kết quả thực hiện hợp đồng của nhà thầu", "Đã thực hiện nghĩa vụ kê khai thuế và nộp thuế", "Phương pháp luận", "Kinh nghiệm và năng lực nhà thầu"], answer: "Uy tín của nhà thầu thông qua việc tham dự thầu, kết quả thực hiện hợp đồng của nhà thầu" },
            { question: "Một trong các căn cứ lập hồ sơ mời thầu là?", options: ["Báo giá của nhà thầu", "Quyết định mua sắm được phê duyệt", "Kế hoạch lựa chọn nhà thầu được duyệt", "Phương án A và B đều đúng"], answer: "Báo giá của nhà thầu" },
            { question: "Đối với gói thầu cung cấp dịch vụ tư vấn, phương pháp đánh giá nào không được áp dụng?", options: ["Giá thấp nhất", "Giá đánh giá", "Kết hợp giữa kỹ thuật và giá", "Giá cố định"], answer: "Giá thấp nhất" },
            { question: "Nội dung nào sau đây không thuộc hồ sơ mời thầu?", options: ["Chỉ dẫn nhà thầu, tùy chọn mua thêm", "Bảng dữ liệu đấu thầu", "Phạm vi cung cấp, yêu cầu về kỹ thuật", "Biên bản hoàn thiện hợp đồng"], answer: "Chỉ dẫn nhà thầu, tùy chọn mua thêm" },
            { question: "Trường hợp nào hồ sơ mời thầu được đưa ra yêu cầu về giấy phép bán hàng?", options: ["Hàng hóa thông thường, có sẵn trên thị trường", "Hàng hóa nhập khẩu", "Hàng hóa đặc thù, phức tạp cần gắn với trách nhiệm của nhà sản xuất", "Hàng hóa có giá trị lớn"], answer: "Hàng hóa thông thường, có sẵn trên thị trường" },
            { question: "Trong quá trình đánh giá hồ sơ dự thầu gói thầu áp dụng đấu thầu rộng rãi, chủ đầu tư phát hiện người đại diện theo pháp luật của 02 nhà thầu là anh em ruột được xem xét như thế nào?", options: ["Thuộc hành vi bị cấm trong đấu thầu", "Không đáp ứng yêu cầu về bảo đảm cạnh tranh trong đấu thầu", "Hồ sơ dự thầu của một trong hai nhà thầu không được xem xét", "Không thuộc hành vi bị cấm, không vi phạm quy định về bảo đảm cạnh tranh trong đấu thầu"], answer: "Thuộc hành vi bị cấm trong đấu thầu" },
            { question: "Việc đánh giá nhà thầu đang trong thời gian bị cấm tham dự thầu thuộc nội dung đánh giá về?", options: ["Kỹ thuật", "Tài chính", "Tư cách hợp lệ", "Năng lực, kinh nghiệm"], answer: "Kỹ thuật" },
            { question: "Khi đánh giá về năng lực kinh nghiệm đối với gói thầu mua sắm hàng hóa, nhà thầu được đánh giá là đạt khi?", options: ["Nhà thầu được đánh giá đạt tất cả tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng một trong các tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng hai phần ba các tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng các tiêu chuẩn đánh giá về năng lực và kinh nghiệm quan trọng trong hồ sơ mời thầu"], answer: "Nhà thầu được đánh giá đạt tất cả tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu" },
            { question: "Hợp đồng theo tỷ lệ phần trăm có thể được áp dụng đối với gói thầu nào sau đây?", options: ["Mua sắm thiết bị y tế", "Xây dựng công trình", "Bảo hiểm công trình mà giá trị hợp đồng được xác định chính xác trên cơ sở giá trị công trình thực tế được nghiệm thu", "Tư vấn giám sát"], answer: "Mua sắm thiết bị y tế" },
            { question: "Cơ sở để thanh toán hợp đồng cho nhà thầu là gì?", options: ["Giá hợp đồng và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng", "Dự toán gói thầu và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng", "Dự toán gói thầu", "Phương án A và C đều sai"], answer: "Giá hợp đồng và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng" },
            { question: "Nhà thầu không được hoàn trả bảo đảm thực hiện hợp đồng trong trường hợp nào?", options: ["Từ chối thực hiện hợp đồng khi hợp đồng đã có hiệu lực", "Thực hiện hợp đồng chậm tiến độ nhưng vẫn hoàn thành hợp đồng", "Nhà thầu đề nghị điều chỉnh tiến độ do bất khả kháng", "Nhà thầu đề xuất thay đổi nhà thầu phụ"], answer: "Từ chối thực hiện hợp đồng khi hợp đồng đã có hiệu lực" },
            { question: "Trường hợp nào sau đây phải áp dụng bảo đảm thực hiện hợp đồng?", options: ["Nhà thầu cung cấp dịch vụ phi tư vấn", "Nhà thầu thực hiện gói thầu có giá gói thầu thuộc hạn mức chỉ định thầu", "Nhà thầu cung cấp dịch vụ tư vấn", "Nhà thầu được lựa chọn theo hình thức tự thực hiện"], answer: "Nhà thầu cung cấp dịch vụ phi tư vấn" },
            { question: "Số lượng các nước thành viên Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP) ký kết hiệp định ban đầu là bao nhiêu nước?", options: ["8", "9", "11", "12"], answer: "8" },
            { question: "Hiện nay, Việt Nam đã mở cửa thị trường mua sắm chính phủ (đấu thầu) trong những hiệp định nào?", options: ["Chỉ Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP)", "Hiệp định CPTPP và Hiệp định thương mại tự do giữa Cộng hòa xã hội chủ nghĩa Việt Nam và Liên minh Châu Âu (EVFTA)", "Hiệp định CPTPP, Hiệp định EVFTA và Hiệp định Thương mại Tự do giữa Việt Nam và Liên hiệp Vương quốc Anh và Bắc Ireland (UKVFTA)", "Tất cả các hiệp định mà Việt Nam là thành viên"], answer: "Chỉ Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP)" },
            { question: "Trong các hiệp định dưới đây, hiệp định nào không có quy định về các trường hợp chỉ định thầu?", options: ["Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP)", "Hiệp định thương mại tự do giữa Cộng hòa xã hội chủ nghĩa Việt Nam và Liên minh Châu Âu (EVFTA)", "Hiệp định EVFTA và Hiệp định Thương mại Tự do giữa Việt Nam và Liên hiệp Vương quốc Anh và Bắc Ireland (UKVFTA)", "Hiệp định Đối tác Kinh tế Toàn diện Khu vực (RCEP)"], answer: "Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP)" },
            { question: "Hoạt động nào sau đây không thuộc phạm vi điều chỉnh của Nghị định số 95/2020/NĐ-CP?", options: ["Mua sắm thiết bị văn phòng", "Thuê dịch vụ tư vấn", "Thuê quyền sử dụng đất", "Mua sắm vật tư y tế"], answer: "Mua sắm thiết bị văn phòng" }
            // --- KẾT THÚC 50 CÂU HỎI BÀI THI SỐ 3 ---
        ]
    },
     exam3: {
        title: "Bài Thi Trắc Nghiệm số 3",
        questions: [
            // --- BẮT ĐẦU 50 CÂU HỎI BÀI THI SỐ 3 (Câu 1-50) ---
            {
                question: "Trường hợp nào sau đây bắt buộc phải lựa chọn nhà thầu theo quy định tại Luật Đấu thầu?",
                options: ["Gói thầu thuộc dự án sử dụng vốn ngân sách nhà nước của cơ quan nhà nước", "Lựa chọn nhà thầu của doanh nghiệp nhà nước không sử dụng vốn ngân sách nhà nước", "Lựa chọn nhà thầu của đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên không sử dụng ngân sách nhà nước", "Gói thầu mua sắm điện nước, xăng dầu của cơ quan nhà nước"],
                answer: "Gói thầu thuộc dự án sử dụng vốn ngân sách nhà nước của cơ quan nhà nước"
            },
            {
                question: "Chọn phương án đúng về phạm vi điều chỉnh của Luật Đấu thầu?",
                options: ["Quy định về quản lý nhà nước đối với hoạt động đấu thầu", "Quy định về thẩm quyền và trách nhiệm của các cơ quan, tổ chức, cá nhân trong hoạt động đấu thầu", "Quy định về hoạt động lựa chọn nhà thầu thực hiện gói thầu, hoạt động lựa chọn nhà đầu tư thực hiện dự án đầu tư kinh doanh", "Tất cả phương án trên đều đúng"],
                answer: "Tất cả phương án trên đều đúng"
            },
            {
                question: "Trường hợp nào sau đây không thuộc đối tượng áp dụng của Luật Đấu thầu?",
                options: ["Gói thầu mua thuốc, hoá chất, vật tư xét nghiệm sử dụng nguồn ngân sách nhà nước của bệnh viện công lập A", "Gói thầu xây dựng đường giao thông sử dụng vốn đầu tư công do Ban Quản lý dự án đầu tư xây dựng công trình tỉnh A làm chủ đầu tư", "Gói thầu mua sắm trang thiết bị làm việc sử dụng vốn nhà nước của Văn phòng UBND tỉnh A", "Hoạt động mua phần mềm kế toán của hộ kinh doanh cá thể"],
                answer: "Hoạt động mua phần mềm kế toán của hộ kinh doanh cá thể"
            },
            {
                question: "Theo quy định pháp luật về đấu thầu, hàng hóa gồm?",
                options: ["Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng: sản phẩm, phương tiện, hàng tiêu dùng, phần mềm thương mại", "Thuốc, hóa chất, vật tư xét nghiệm, thiết bị y tế", "Phương án A và B đều đúng", "Logistics, bảo hiểm, quảng cáo, nghiệm thu chạy thử, chụp ảnh vệ tinh"],
                answer: "Phương án A và B đều đúng"
            },
            {
                question: "Gói thầu nào là gói thầu cung cấp dịch vụ phi tư vấn?",
                options: ["Gói thầu in sổ công tác của tỉnh A", "Gói thầu thuê kiểm toán dự án", "Gói thầu mua phần mềm kế toán hỗ trợ doanh nghiệp khởi nghiệp sáng tạo, doanh nghiệp nhỏ do phụ nữ làm chủ", "Gói thầu xây dựng trụ sở làm việc của tỉnh A"],
                answer: "Gói thầu in sổ công tác của tỉnh A"
            },
            {
                question: "Theo quy định pháp luật về đấu thầu, đấu thầu là gì?",
                options: ["Là quá trình lựa chọn nhà thầu để ký kết, thực hiện hợp đồng cung cấp dịch vụ tư vấn, dịch vụ phi tư vấn, mua sắm hàng hóa, xây lắp...", "Là quá trình lựa chọn nhà đầu tư để ký kết, thực hiện hợp đồng dự án đầu tư kinh doanh...", "Là quá trình lựa chọn đơn vị để thực hiện hợp đồng thông qua các quy trình, thủ tục do pháp luật đấu thầu quy định.", "Phương án A và B đều đúng"],
                answer: "Phương án A và B đều đúng"
            },
            {
                question: "Đấu thầu quốc tế là gì?",
                options: ["Là hoạt động đấu thầu mà nhà thầu trong nước, nước ngoài được tham dự thầu", "Là hoạt động đấu thầu mà nhà thầu trong nước, nước ngoài được tham dự thầu, trong đó nhà thầu trong nước bắt buộc phải liên danh với nhà thầu nước ngoài", "Là hoạt động đấu thầu chỉ nhà thầu quốc tế được phép tham dự thầu", "Là hoạt động đấu thầu chỉ nhà thầu trong nước được phép tham dự thầu"],
                answer: "Là hoạt động đấu thầu mà nhà thầu trong nước, nước ngoài được tham dự thầu"
            },
            {
                question: "Giá đề nghị trúng thầu là gì?",
                options: ["Là giá dự thầu của nhà thầu ghi trong quyết định phê duyệt kết quả lựa chọn nhà thầu.", "Là giá dự thầu của nhà thầu được đề nghị trúng thầu sau khi đã được sửa lỗi, hiệu chỉnh sai lệch theo yêu cầu của hồ sơ mời thầu, hồ sơ yêu cầu, trừ đi giá trị giảm giá (nếu có)", "Là giá dự thầu của nhà thầu chưa tính sửa lỗi, hiệu chỉnh sai lệch và giá trị giảm giá (nếu có)", "Là giá trị ghi trong hợp đồng giữa chủ đầu tư và nhà thầu"],
                answer: "Là giá dự thầu của nhà thầu được đề nghị trúng thầu sau khi đã được sửa lỗi, hiệu chỉnh sai lệch theo yêu cầu của hồ sơ mời thầu, hồ sơ yêu cầu, trừ đi giá trị giảm giá (nếu có)"
            },
            {
                question: "Theo quy định pháp luật về đấu thầu, gói thầu nào được xếp vào gói thầu cung cấp dịch vụ tư vấn?",
                options: ["Thiết kế và cung cấp hệ thống xử lý nước thải", "Gói thầu lập nhiệm vụ quy hoạch vùng", "Gói thầu quảng cáo trên nền tảng xã hội và phát sóng trên VTV", "Gói thầu mua phần mềm kế toán MISA"],
                answer: "Gói thầu lập nhiệm vụ quy hoạch vùng"
            },
            {
                question: "Đối tượng được hưởng ưu đãi trong lựa chọn nhà thầu là gì?",
                options: ["Hàng hóa có xuất xứ Việt Nam", "Nhà thầu trong nước sản xuất hàng hóa có xuất xứ Việt Nam phù hợp với hồ sơ mời thầu", "Sản phẩm, dịch vụ thân thiện môi trường theo quy định của pháp luật về bảo vệ môi trường", "Tất cả các phương án trên đều đúng"],
                answer: "Tất cả các phương án trên đều đúng"
            },
            {
                question: "Nhà thầu trong nước nào được hưởng ưu đãi trong lựa chọn nhà thầu?",
                options: ["Nhà thầu trong nước sản xuất hàng hóa có xuất xứ Việt Nam phù hợp với hồ sơ mời thầu", "Nhà thầu trong nước tham dự thầu với tư cách độc lập hoặc liên danh với nhà thầu trong nước khác khi tham dự đấu thầu quốc tế", "Nhà thầu có sử dụng lao động nữ, thương binh, người khuyết tật hoặc người dân tộc thiểu số", "Tất cả các phương án trên đều đúng"],
                answer: "Nhà thầu trong nước tham dự thầu với tư cách độc lập hoặc liên danh với nhà thầu trong nước khác khi tham dự đấu thầu quốc tế"
            },
            {
                question: "Trường hợp nào sau đây cơ quan, tổ chức, doanh nghiệp được tự quyết định việc lựa chọn nhà thầu trên cơ sở bảo đảm công khai, minh bạch, hiệu quả và trách nhiệm giải trình?",
                options: ["Thực hiện gói thầu thuộc dự án sử dụng vốn đầu tư công của cơ quan nhà nước", "Thực hiện gói thầu thuộc dự án sử dụng vốn đầu tư công của đơn vị sự nghiệp công lập bảo đảm một phần chi thường xuyên", "Thực hiện gói thầu thuộc dự án sử dụng vốn ngân sách nhà nước của doanh nghiệp nhà nước", "Lựa chọn nhà thầu của doanh nghiệp nhà nước không sử dụng vốn ngân sách nhà nước, đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên và chủ đầu tư, đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên không sử dụng ngân sách nhà nước"],
                answer: "Lựa chọn nhà thầu của doanh nghiệp nhà nước không sử dụng vốn ngân sách nhà nước, đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên và chủ đầu tư, đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên không sử dụng ngân sách nhà nước"
            },
            {
                question: "Điều kiện để tổ chức đấu thầu quốc tế lựa chọn nhà thầu thực hiện gói thầu mua sắm hàng hóa là gì?",
                options: ["Gói thầu mua sắm hàng hóa thông dụng, đơn giản, có sẵn trên thị trường", "Gói thầu mua sắm hàng hóa mà hàng hóa đó trong nước sản xuất được và đáp ứng các yêu cầu về kỹ thuật, chất lượng, giá nhưng chủ đầu tư yêu cầu phải mua hàng hóa nhập khẩu", "Gói thầu mua sắm hàng hóa mà hàng hóa đó trong nước không sản xuất được hoặc sản xuất được nhưng không đáp ứng một trong các yêu cầu về kỹ thuật, chất lượng, giá", "Gói thầu mua sắm hàng hóa thông dụng đã được nhập khẩu và chào bán tại Việt Nam nhưng hàng hóa đó trong nước không sản xuất được"],
                answer: "Gói thầu mua sắm hàng hóa mà hàng hóa đó trong nước không sản xuất được hoặc sản xuất được nhưng không đáp ứng một trong các yêu cầu về kỹ thuật, chất lượng, giá"
            },
            {
                question: "Ngôn ngữ sử dụng đối với đấu thầu quốc tế là gì?",
                options: ["Tiếng Việt", "Tiếng Đức", "Tiếng Anh hoặc tiếng Việt và tiếng Anh", "Tiếng Anh"],
                answer: "Tiếng Anh hoặc tiếng Việt và tiếng Anh"
            },
            {
                question: "Đối với đấu thầu quốc tế, trường hợp ngôn ngữ sử dụng trong hồ sơ mời thầu là tiếng Việt và tiếng Anh thì khi tham dự thầu, nhà thầu sử dụng ngôn ngữ gì?",
                options: ["Tiếng Việt hoặc tiếng Anh", "Tiếng Việt", "Tiếng Anh", "Bắt buộc cả tiếng Việt và tiếng Anh"],
                answer: "Tiếng Việt hoặc tiếng Anh"
            },
            {
                question: "Trong trường hợp hủy thầu, toàn bộ hồ sơ liên quan đến quá trình lựa chọn nhà thầu của gói thầu đó có cần phải lưu trữ không?",
                options: ["Không cần lưu trữ, hủy hồ sơ ngay sau khi quyết định hủy thầu được ban hành nhưng phải đảm bảo thông tin không bị tiết lộ", "Không cần lưu trữ, trả lại hồ sơ cho nhà thầu theo nguyên trạng ngay sau khi quyết định hủy thầu được ban hành", "Có cần lưu trữ, trong thời hạn 05 năm kể từ ngày quyết định hủy thầu được ban hành", "Có cần lưu trữ, trong thời hạn 03 năm kể từ ngày quyết định hủy thầu được ban hành"],
                answer: "Có cần lưu trữ, trong thời hạn 05 năm kể từ ngày quyết định hủy thầu được ban hành"
            },
            {
                question: "Trường hợp hồ sơ đề xuất về tài chính của Nhà thầu không vượt qua bước đánh giá về kỹ thuật, Nhà thầu từ chối nhận lại hồ sơ đề xuất của mình thì Chủ đầu tư phải:",
                options: ["Chủ đầu tư xem xét, quyết định việc hủy hồ sơ nhưng phải đảm bảo thông tin không bị tiết lộ", "Chủ đầu tư phải lưu trữ theo quy định của pháp luật về lưu trữ", "Chủ đầu tư lưu trữ tối thiểu 05 năm", "Tất cả các phương án trên đều sai"],
                answer: "Chủ đầu tư xem xét, quyết định việc hủy hồ sơ nhưng phải đảm bảo thông tin không bị tiết lộ"
            },
            {
                question: "Hồ sơ hoàn công và quyết toán của gói thầu được lưu trữ theo quy định nào?",
                options: ["Quy định nội bộ của nhà thầu", "Quy định của tư vấn giám sát", "Quy định của pháp luật về lưu trữ", "Tất cả phương án trên đều sai"],
                answer: "Quy định của pháp luật về lưu trữ"
            },
            {
                question: "Đối với gói thầu xây lắp đấu thầu không qua mạng, hồ sơ đề xuất tài chính của nhà thầu không được lựa chọn sẽ được trả lại khi nào?",
                options: ["Khi gửi thư mời thương thảo", "Khi kết thúc giai đoạn đánh giá kỹ thuật", "Khi hoàn trả bảo đảm dự thầu của nhà thầu không được lựa chọn hoặc đăng tải kết quả lựa chọn nhà thầu", "Khi ký hợp đồng"],
                answer: "Khi hoàn trả bảo đảm dự thầu của nhà thầu không được lựa chọn hoặc đăng tải kết quả lựa chọn nhà thầu"
            },
            {
                question: "Đối với đấu thầu quốc tế, hồ sơ mời thầu được phát hành như thế nào?",
                options: ["HSMT được phát hành trên Hệ thống mạng đấu thầu quốc gia: Nhà thầu nộp tiền mua bản điện tử hồ sơ mời thầu khi nộp hồ sơ dự thầu", "HSMT được bán vào giờ hành chính từ thứ 2 tới thứ 6 tại địa chỉ do Chủ đầu tư quy định", "Phương án A và B đều đúng", "Phương án A và B đều sai"],
                answer: "HSMT được phát hành trên Hệ thống mạng đấu thầu quốc gia: Nhà thầu nộp tiền mua bản điện tử hồ sơ mời thầu khi nộp hồ sơ dự thầu"
            },
            {
                question: "Đối với gói thầu sử dụng vốn ngân sách nhà nước, tiền bán bản điện tử hồ sơ mời thầu, hồ sơ yêu cầu sẽ được xử lý như thế nào?",
                options: ["Sử dụng theo quy chế tài chính của chủ đầu tư", "Nộp vào ngân sách nhà nước theo quy định của Luật Ngân sách nhà nước", "Sử dụng theo cơ chế khoán chi", "Tất cả các đáp án trên đều sai"],
                answer: "Nộp vào ngân sách nhà nước theo quy định của Luật Ngân sách nhà nước"
            },
            {
                question: "Chi phí đăng tải quyết định phê duyệt kế hoạch lựa chọn nhà thầu và quyết định phê duyệt kết quả lựa chọn nhà thầu lên Hệ thống mạng đấu thầu quốc gia đối với gói thầu chỉ định thầu là bao nhiêu?",
                options: ["220.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)", "330.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)", "Miễn phí", "110.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)"],
                answer: "110.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)"
            },
            {
                question: "Thành viên tổ chuyên gia cần có tối thiểu bao nhiêu năm kinh nghiệm trong lĩnh vực liên quan?",
                options: ["01 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "02 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "03 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "Không có quy định về số năm kinh nghiệm"],
                answer: "03 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu"
            },
            {
                question: "Bảo đảm cạnh tranh trong đấu thầu thuộc nội dung đánh giá về?",
                options: ["Tư cách hợp lệ", "Năng lực, kinh nghiệm", "Kỹ thuật", "Tài chính"],
                answer: "Tư cách hợp lệ"
            },
            {
                question: "Nhà thầu tham gia đấu thầu gói thầu hàng hóa phải độc lập với chủ thể nào sau đây?",
                options: ["Phải độc lập với nhà thầu tư vấn lập hồ sơ mời thầu gói thầu hàng hóa", "Phải độc lập với nhà thầu khác khi tham gia đấu thầu rộng rãi", "Phải độc lập với nhà thầu tư vấn lập kế hoạch tổng thể lựa chọn nhà thầu", "Phải độc lập với nhà thầu tư vấn lập kế hoạch lựa chọn nhà thầu"],
                answer: "Phải độc lập với nhà thầu tư vấn lập hồ sơ mời thầu gói thầu hàng hóa"
            },
            {
                question: "Nhận định nào sau đây không phù hợp với quy định về bảo đảm cạnh tranh trong đấu thầu?",
                options: ["Nhà thầu tham dự thầu phải độc lập với chủ đầu tư, trừ trường hợp...", "Nhà thầu tham dự thầu phải độc lập với nhà thầu tư vấn quản lý dự án, tư vấn giám sát", "Nhà thầu tham dự thầu phải độc lập với nhà thầu tư vấn lập, thẩm tra, thẩm định hồ sơ thiết kế, dự toán", "Nhà thầu thực hiện hợp đồng phải độc lập với nhà thầu tư vấn lập kế hoạch lựa chọn nhà thầu."],
                answer: "Nhà thầu thực hiện hợp đồng phải độc lập với nhà thầu tư vấn lập kế hoạch lựa chọn nhà thầu."
            },
            {
                question: "Nội dung nào sau đây không thuộc quy định về bảo đảm cạnh tranh trong đấu thầu khi nhà thầu tham dự thầu đấu thầu rộng rãi gói thầu EPC, EP, EC?",
                options: ["Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra thiết kế FEED", "Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra báo cáo nghiên cứu khả thi...", "Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra báo cáo kinh tế kỹ thuật...", "Nhà thầu tham dự thầu phải độc lập với nhà thầu khác cùng tham dự đấu thầu rộng rãi"],
                answer: "Nhà thầu tham dự thầu phải độc lập với nhà thầu khác cùng tham dự đấu thầu rộng rãi"
            },
            {
                question: "Nội dung nào là nội dung đánh giá tính hợp lệ của hồ sơ dự thầu?",
                options: ["Nhân sự chủ chốt", "Hiệu lực của hồ sơ dự thầu", "Năng lực tài chính", "Việc thực hiện nghĩa vụ kê khai thuế, nộp thuế"],
                answer: "Hiệu lực của hồ sơ dự thầu"
            },
            {
                question: "Nội dung nào không phải là tiêu chuẩn đánh giá về tính hợp lệ của hồ sơ dự thầu gói thầu tư vấn?",
                options: ["Hiệu lực của hồ sơ đề xuất về kỹ thuật đáp ứng yêu cầu theo quy định trong hồ sơ mời thầu", "Có bản gốc hồ sơ đề xuất về kỹ thuật", "Bảo đảm dự thầu hợp lệ", "Đã thực hiện nghĩa vụ kê khai thuế và nộp thuế"],
                answer: "Bảo đảm dự thầu hợp lệ"
            },
            {
                question: "Đối với gói thầu mua sắm hàng hóa, xây lắp, phi tư vấn, phương pháp để đánh giá về năng lực và kinh nghiệm là:",
                options: ["Sử dụng tiêu chí đạt, không đạt", "Sử dụng phương pháp chấm điểm", "Kết hợp cả hai phương pháp tiêu chí đạt, không đạt và phương pháp chấm điểm", "Phương pháp dựa trên kỹ thuật"],
                answer: "Sử dụng tiêu chí đạt, không đạt"
            },
            {
                question: "Tiêu chuẩn đánh giá năng lực kinh nghiệm đối với gói thầu mua sắm hàng hóa bao gồm?",
                options: ["Doanh thu bình quân 3 năm gần nhất", "Giấy phép bán hàng của nhà sản xuất", "Số năm thành lập của doanh nghiệp", "Năng lực quản lý của doanh nghiệp"],
                answer: "Doanh thu bình quân 3 năm gần nhất"
            },
            {
                question: "Nội dung nào là tiêu chuẩn đánh giá về năng lực và kinh nghiệm không bắt buộc đối với gói thầu mua sắm hàng hóa?",
                options: ["Kinh nghiệm thực hiện hợp đồng cung cấp hàng hóa tương tự", "Giá trị tài sản ròng của nhà thầu", "Doanh thu của nhà thầu", "Việc thực hiện nghĩa vụ kê khai thuế và nộp thuế"],
                answer: "Việc thực hiện nghĩa vụ kê khai thuế và nộp thuế"
            },
            {
                question: "Nội dung nào là tiêu chuẩn đánh giá về năng lực và kinh nghiệm bắt buộc đối với gói thầu xây lắp tổ chức đấu thầu rộng rãi không qua mạng?",
                options: ["Có bản gốc hồ sơ dự thầu", "Có tên trong danh sách ngắn", "Năng lực tài chính", "Có bảo đảm dự thầu hợp lệ"],
                answer: "Năng lực tài chính"
            },
            {
                question: "Tiêu chuẩn đánh giá về kỹ thuật được yêu cầu về nhãn hiệu theo nhóm nhãn hiệu cho nguyên nhiên vật liệu, vật tư và các yếu tố đầu vào đối với trường hợp nào?",
                options: ["Nội dung công việc xây lắp thuộc gói thầu xây lắp, gói thầu EC", "Nội dung công việc xây lắp thuộc gói thầu EPC", "Nội dung công việc xây lắp thuộc gói thầu EPC và gói thầu PC", "Nội dung công việc xây lắp thuộc gói thầu xây lắp và gói thầu PC"],
                answer: "Nội dung công việc xây lắp thuộc gói thầu EPC"
            },
            {
                question: "Nội dung nào không phải là tiêu chuẩn đánh giá về kỹ thuật của gói thầu tư vấn?",
                options: ["Uy tín của nhà thầu thông qua việc tham dự thầu, kết quả thực hiện hợp đồng của nhà thầu", "Đã thực hiện nghĩa vụ kê khai thuế và nộp thuế", "Uy tín của nhà thầu", "Kinh nghiệm và năng lực nhà thầu"],
                answer: "Đã thực hiện nghĩa vụ kê khai thuế và nộp thuế"
            },
            {
                question: "Một trong các căn cứ lập hồ sơ mời thầu là:",
                options: ["Báo giá của nhà thầu", "Quyết định mua sắm được phê duyệt", "Kế hoạch lựa chọn nhà thầu được duyệt", "Phương án A và B đều đúng"],
                answer: "Kế hoạch lựa chọn nhà thầu được duyệt"
            },
            {
                question: "Đối với gói thầu cung cấp dịch vụ tư vấn, phương pháp đánh giá nào không được áp dụng?",
                options: ["Giá thấp nhất", "Giá đánh giá", "Kết hợp giữa kỹ thuật và giá", "Giá cố định"],
                answer: "Giá đánh giá"
            },
            {
                question: "Nội dung nào sau đây không thuộc hồ sơ mời thầu?",
                options: ["Chỉ dẫn nhà thầu, tùy chọn mua thêm", "Bảng dữ liệu đấu thầu", "Phạm vi cung cấp, yêu cầu về kỹ thuật", "Biên bản hoàn thiện hợp đồng"],
                answer: "Biên bản hoàn thiện hợp đồng"
            },
            {
                question: "Trường hợp nào hồ sơ mời thầu được đưa ra yêu cầu về giấy phép bán hàng?",
                options: ["Hàng hóa thông thường, có sẵn trên thị trường", "Hàng hóa nhập khẩu", "Hàng hóa đặc thù, phức tạp cần gắn với trách nhiệm của nhà sản xuất", "Hàng hóa có giá trị lớn"],
                answer: "Hàng hóa đặc thù, phức tạp cần gắn với trách nhiệm của nhà sản xuất"
            },
            {
                question: "Trong quá trình đánh giá hồ sơ dự thầu gói thầu áp dụng đấu thầu rộng rãi, chủ đầu tư phát hiện người đại diện theo pháp luật của 02 nhà thầu là anh em ruột được xem xét như thế nào?",
                options: ["Thuộc hành vi bị cấm trong đấu thầu", "Không đáp ứng yêu cầu về bảo đảm cạnh tranh trong đấu thầu", "Hồ sơ dự thầu của một trong hai nhà thầu không được xem xét", "Không thuộc hành vi bị cấm, không vi phạm quy định về bảo đảm cạnh tranh trong đấu thầu"],
                answer: "Không thuộc hành vi bị cấm, không vi phạm quy định về bảo đảm cạnh tranh trong đấu thầu"
            },
            {
                question: "Việc đánh giá nhà thầu đang trong thời gian bị cấm tham dự thầu thuộc nội dung đánh giá về:",
                options: ["Kỹ thuật", "Tài chính", "Tư cách hợp lệ", "Năng lực, kinh nghiệm"],
                answer: "Tư cách hợp lệ"
            },
            {
                question: "Khi đánh giá về năng lực kinh nghiệm đối với gói thầu mua sắm hàng hóa, nhà thầu được đánh giá là đạt khi:",
                options: ["Nhà thầu được đánh giá đạt tất cả tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng một trong các tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng hai phần ba các tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng các tiêu chuẩn đánh giá về năng lực và kinh nghiệm quan trọng trong hồ sơ mời thầu"],
                answer: "Nhà thầu được đánh giá đạt tất cả tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu"
            },
            {
                question: "Hợp đồng theo tỷ lệ phần trăm có thể được áp dụng đối với gói thầu nào sau đây?",
                options: ["Mua sắm thiết bị y tế", "Xây dựng công trình", "Bảo hiểm công trình mà giá trị hợp đồng được xác định chính xác trên cơ sở giá trị công trình thực tế được nghiệm thu", "Tư vấn giám sát"],
                answer: "Bảo hiểm công trình mà giá trị hợp đồng được xác định chính xác trên cơ sở giá trị công trình thực tế được nghiệm thu"
            },
            {
                question: "Cơ sở để thanh toán hợp đồng cho nhà thầu là gì?",
                options: ["Giá hợp đồng và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng", "Dự toán gói thầu và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng", "Dự toán gói thầu", "Phương án A và C đều sai"],
                answer: "Giá hợp đồng và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng"
            },
            {
                question: "Nhà thầu không được hoàn trả bảo đảm thực hiện hợp đồng trong trường hợp:",
                options: ["Từ chối thực hiện hợp đồng khi hợp đồng đã có hiệu lực", "Thực hiện hợp đồng chậm tiến độ nhưng vẫn hoàn thành hợp đồng", "Nhà thầu đề nghị điều chỉnh tiến độ do bất khả kháng", "Nhà thầu đề xuất thay đổi nhà thầu phụ"],
                answer: "Từ chối thực hiện hợp đồng khi hợp đồng đã có hiệu lực"
            },
            {
                question: "Trường hợp nào sau đây phải áp dụng bảo đảm thực hiện hợp đồng?",
                options: ["Nhà thầu cung cấp dịch vụ phi tư vấn", "Nhà thầu thực hiện gói thầu có giá gói thầu thuộc hạn mức chỉ định thầu", "Nhà thầu cung cấp dịch vụ tư vấn", "Nhà thầu được lựa chọn theo hình thức tự thực hiện"],
                answer: "Nhà thầu cung cấp dịch vụ phi tư vấn"
            },
            {
                question: "Hiện nay, Việt Nam đã mở cửa thị trường mua sắm chính phủ (đấu thầu) trong những hiệp định nào?",
                options: ["Chỉ Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP)", "Hiệp định CPTPP và Hiệp định thương mại tự do giữa Cộng hòa xã hội chủ nghĩa Việt Nam và Liên minh Châu Âu (EVFTA)", "Hiệp định CPTPP, Hiệp định EVFTA và Hiệp định Thương mại Tự do giữa Việt Nam và Liên hiệp Vương quốc Anh và Bắc Ireland (UKVFTA)", "Tất cả các hiệp định mà Việt Nam là thành viên"],
                answer: "Hiệp định CPTPP, Hiệp định EVFTA và Hiệp định Thương mại Tự do giữa Việt Nam và Liên hiệp Vương quốc Anh và Bắc Ireland (UKVFTA)"
            },
            {
                question: "Số lượng các nước thành viên Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP) ký kết hiệp định ban đầu là bao nhiêu nước?",
                options: ["8", "9", "11 nước", "12 nước"],
                answer: "11 nước"
            },
            {
                question: "Trong các hiệp định dưới đây, hiệp định nào không có quy định về các trường hợp chỉ định thầu?",
                options: ["Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP)", "Hiệp định thương mại tự do giữa Cộng hòa xã hội chủ nghĩa Việt Nam và Liên minh Châu Âu (EVFTA)", "Hiệp định EVFTA và Hiệp định Thương mại Tự do giữa Việt Nam và Liên hiệp Vương quốc Anh và Bắc Ireland (UKVFTA)", "Hiệp định Đối tác Kinh tế Toàn diện Khu vực (RCEP)"],
                answer: "Hiệp định Đối tác Kinh tế Toàn diện Khu vực (RCEP)"
            },
            {
                question: "Hoạt động nào sau đây không thuộc phạm vi điều chỉnh của Nghị định số 95/2020/NĐ-CP?",
                options: ["Mua sắm thiết bị văn phòng", "Thuê dịch vụ tư vấn", "Thuê quyền sử dụng đất", "Mua sắm vật tư y tế"],
                answer: "Thuê quyền sử dụng đất"
            }
        ]
    },
    exam4: {
        title: "Bài Thi Trắc Nghiệm số 4",
        questions: [
            // --- BẮT ĐẦU 50 CÂU HỎI BÀI THI SỐ 4 (Câu 51-100) ---
            {
                question: "Theo các hiệp định mà Việt Nam có mở cửa thị trường mua sắm chính phủ (đấu thầu), nhà thầu nước ngoài được tham gia đấu thầu tại Việt Nam trong:",
                options: ["Tất cả các gói thầu", "Chỉ gói thầu ODA", "Gói thầu thuộc phạm vi điều chỉnh của hiệp định", "Gói thầu có giá trị lớn, phức tạp"],
                answer: "Gói thầu thuộc phạm vi điều chỉnh của hiệp định"
            },
            {
                question: "Theo quy định tại Nghị định số 95/2020/NĐ-CP, đấu thầu nội khối là:",
                options: ["Đấu thầu mà chỉ có nhà thầu nội khối được tham dự", "Đấu thầu cho các dự án trong khối CPTPP", "Đấu thầu giữa các nước thành viên EVFTA, UKVFTA", "Đấu thầu trong nước"],
                answer: "Đấu thầu mà chỉ có nhà thầu nội khối được tham dự"
            },
            {
                question: "Theo quy định tại Nghị định số 09/2022/NĐ-CP, cơ quan mua sắm phải tổ chức đấu thầu nội khối, trừ trường hợp nào?",
                options: ["Không có nhà thầu trong nước tham gia", "Giá gói thầu quá lớn", "Người có thẩm quyền xét thấy cần tổ chức đấu thầu quốc tế để mang lại hiệu quả cao hơn cho dự án, gói thầu", "Hàng hóa thuộc gói thầu quá phức tạp mà nhà thầu trong nước không đáp ứng được"],
                answer: "Người có thẩm quyền xét thấy cần tổ chức đấu thầu quốc tế để mang lại hiệu quả cao hơn cho dự án, gói thầu"
            },
            {
                question: "Theo Thông tư số 21/2022/TT-BKHĐT, khi nào được đưa ra yêu cầu về nhân sự chủ chốt trong gói thầu dịch vụ phi tư vấn?",
                options: ["Trong mọi trường hợp", "Khi giá gói thầu lớn", "Chỉ khi dịch vụ có yếu tố đặc thù, phức tạp cần thiết phải có nhân sự có hiểu biết, nhiều kinh nghiệm đảm nhận", "Khi có yêu cầu của nhà thầu"],
                answer: "Chỉ khi dịch vụ có yếu tố đặc thù, phức tạp cần thiết phải có nhân sự có hiểu biết, nhiều kinh nghiệm đảm nhận"
            },
            {
                question: "Gói thầu mua thuốc là gói thầu nào?",
                options: ["Gói thầu mua sắm hàng hóa", "Gói thầu cung cấp dịch vụ phi tư vấn", "Gói thầu hỗn hợp", "Gói thầu xây lắp"],
                answer: "Gói thầu mua sắm hàng hóa"
            },
            {
                question: "Đàm phán giá được áp dụng trong trường hợp nào sau đây?",
                options: ["Mua thuốc chỉ có 01 hoặc 02 hãng sản xuất", "Mua thuốc, thiết bị y tế, vật tư xét nghiệm chỉ có 01 hãng sản xuất", "Mua hàng hóa chỉ có 01 hãng sản xuất", "Mua hàng hóa chỉ có 01 hoặc 02 hãng sản xuất"],
                answer: "Mua thuốc, thiết bị y tế, vật tư xét nghiệm chỉ có 01 hãng sản xuất"
            },
            {
                question: "Quy định về thời điểm bắt đầu và kết thúc chào giá trực tuyến theo quy trình rút gọn?",
                options: ["Thời điểm bắt đầu và kết thúc phải trong giờ hành chính.", "Thời điểm bắt đầu không bắt buộc trong giờ hành chính nhưng kết thúc phải trong giờ hành chính.", "Thời điểm bắt đầu và kết thúc không bắt buộc trong giờ hành chính.", "Tất cả phương án trên đều sai"],
                answer: "Thời điểm bắt đầu và kết thúc phải trong giờ hành chính."
            },
            {
                question: "Khi đánh giá E-HSDT gói thầu xây lắp đấu thầu rộng rãi qua mạng, trường hợp có sự không thống nhất giữa thông tin về hợp đồng tương tự kê khai trên webform và file tài liệu chứng minh các thông tin về hợp đồng đó thì xử lý:",
                options: ["Đánh giá nhà thầu không đạt yêu cầu về hợp đồng tương tự", "Yêu cầu nhà thầu làm rõ E-HSDT trên Hệ thống mạng đấu thầu quốc gia", "Yêu cầu nhà thầu gửi bổ sung hợp đồng tương tự bằng bản giấy để đánh giá", "Các phương án trên đều sai"],
                answer: "Yêu cầu nhà thầu làm rõ E-HSDT trên Hệ thống mạng đấu thầu quốc gia"
            },
            {
                question: "Nhà thầu có trách nhiệm kê khai thông tin nào trên Hệ thống mạng đấu thầu quốc gia?",
                options: ["Thông tin về uy tín của nhà thầu", "Thông tin về vi phạm của nhà thầu", "Thông tin về năng lực, kinh nghiệm", "Cả 3 phương án trên"],
                answer: "Thông tin về năng lực, kinh nghiệm"
            },
            {
                question: "Nhận định nào sau đây đúng về văn bản điện tử trên Hệ thống mạng đấu thầu quốc gia?",
                options: ["Văn bản điện tử trên Hệ thống có giá trị theo quy định của pháp luật về giao dịch điện tử...", "Thời điểm gửi, nhận văn bản điện tử được xác định căn cứ theo thời gian thực ghi lại trên Hệ thống", "Khi gửi hồ sơ thanh quyết toán đến Kho bạc Nhà nước, nhà thầu không phải cung cấp thông tin...", "Cả 3 phương án trên đều đúng"],
                answer: "Cả 3 phương án trên đều đúng"
            },
            {
                question: "Ai chịu trách nhiệm đăng tải thông tin chủ yếu của hợp đồng trên Hệ thống mạng đấu thầu quốc gia?",
                options: ["Bên mời thầu", "Tổ chuyên gia", "Tư vấn đấu thầu", "Chủ đầu tư"],
                answer: "Chủ đầu tư"
            },
            {
                question: "Trong đấu thầu qua mạng, nhà thầu tư vấn đấu thầu bị khóa tài khoản trong vòng 06 tháng khi thực hiện hành vi nào sau đây?",
                options: ["Tham gia vào quá trình lập và đánh giá E-HSMT", "Tham gia vào quá trình thẩm định hồ sơ mời thầu và kết quả lựa chọn nhà thầu", "Thay chủ đầu tư đăng tải các nội dung thuộc trách nhiệm đăng tải của chủ đầu tư", "Đăng tải thông tin về năng lực, kinh nghiệm của mình trên Hệ thống mạng đấu thầu quốc gia"],
                answer: "Thay chủ đầu tư đăng tải các nội dung thuộc trách nhiệm đăng tải của chủ đầu tư"
            },
            {
                question: "Chủ đầu tư có trách nhiệm đăng tải thông tin chủ yếu của hợp đồng trên Hệ thống đấu thầu quốc gia chậm nhất là:",
                options: ["05 ngày làm việc kể từ ngày ký kết hợp đồng", "05 ngày làm việc kể từ ngày hợp đồng có hiệu lực", "05 ngày kể từ ngày hợp đồng có hiệu lực", "05 ngày làm việc kể từ ngày nhà thầu nộp bảo đảm thực hiện hợp đồng"],
                answer: "05 ngày làm việc kể từ ngày ký kết hợp đồng"
            },
            {
                question: "Đối với đấu thầu qua mạng, việc trả lời yêu cầu làm rõ E-HSMT được thực hiện bởi:",
                options: ["Do tổ chuyên gia thực hiện bằng văn bản", "Do tổ chuyên gia thực hiện trên Hệ thống mạng đấu thầu quốc gia", "Do tư vấn đấu thầu thực hiện bằng tài khoản của đơn vị tư vấn", "Do Chủ đầu tư thực hiện trên Hệ thống mạng đấu thầu quốc gia"],
                answer: "Do Chủ đầu tư thực hiện trên Hệ thống mạng đấu thầu quốc gia"
            },
            {
                question: "Danh sách nhà thầu có hành vi vi phạm và bị đánh giá về uy tín được đăng tải trên Hệ thống mạng đấu thầu quốc gia như thế nào?",
                options: ["Tổ chuyên gia đăng tải trong thời hạn 03 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm", "Bên mời thầu đăng tải trong thời hạn 05 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm", "Chủ đầu tư đăng tải trong thời hạn 07 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm", "Người có thẩm quyền đăng tải trong thời hạn 05 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm"],
                answer: "Bên mời thầu đăng tải trong thời hạn 05 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm"
            },
            {
                question: "Nhà thầu không phải đính kèm thư bảo lãnh (hoặc giấy chứng nhận bảo hiểm bảo lãnh) mà chỉ phải cam kết trong đơn dự thầu khi:",
                options: ["E-HSMT yêu cầu giá trị bảo đảm dự thầu là 40 triệu đồng", "E-HSMT yêu cầu giá trị bảo đảm dự thầu là 50 triệu đồng", "E-HSMT yêu cầu giá trị bảo đảm dự thầu là 60 triệu đồng", "E-HSMT yêu cầu giá trị bảo đảm dự thầu là 100 triệu đồng"],
                answer: "E-HSMT yêu cầu giá trị bảo đảm dự thầu là 40 triệu đồng"
            },
            {
                question: "Đối với đấu thầu qua mạng, việc làm rõ E-HSDT giữa Chủ đầu tư và nhà thầu có E-HSDT cần phải làm rõ được thực hiện như thế nào?",
                options: ["Chủ đầu tư được làm rõ đối với các nội dung về tư cách hợp lệ, năng lực, kinh nghiệm, không được làm rõ đối với yêu cầu về kỹ thuật, tài chính", "Chủ đầu tư được làm rõ đối với yêu cầu về kỹ thuật, tài chính, không được làm rõ đối với các nội dung về tư cách hợp lệ, năng lực, kinh nghiệm", "Chủ đầu tư dành cho nhà thầu tối đa 03 ngày để nhà thầu thực hiện việc làm rõ E-HSDT", "Chủ đầu tư dành cho nhà thầu tối thiểu 03 ngày làm việc để nhà thầu thực hiện việc làm rõ E-HSDT"],
                answer: "Chủ đầu tư dành cho nhà thầu tối thiểu 03 ngày làm việc để nhà thầu thực hiện việc làm rõ E-HSDT"
            },
            {
                question: "Bản gốc thư bảo lãnh dự thầu, giấy chứng nhận bảo hiểm bảo lãnh trong đấu thầu qua mạng được nộp như thế nào?",
                options: ["Gửi qua email đến Tổ trưởng Tổ chuyên gia", "Gửi cho Chủ đầu tư khi nhà thầu được mời vào đối chiếu tài liệu", "Gửi bản gốc đến địa chỉ bên mời thầu theo quy định trong E-HSMT", "Gửi cho Đơn vị tư vấn đấu thầu đánh giá E-HSDT"],
                answer: "Gửi cho Chủ đầu tư khi nhà thầu được mời vào đối chiếu tài liệu"
            },
            {
                question: "Đối với đấu thầu qua mạng, quy định nào về việc mở thầu và công khai biên bản mở thầu trên Hệ thống mạng đấu thầu quốc gia là đúng?",
                options: ["Hệ thống tự động mở thầu và công khai biên bản mở thầu trong thời hạn không quá 02 giờ kể từ thời điểm đóng thầu.", "Chủ đầu tư phải mở thầu và công khai biên bản mở thầu trên Hệ thống trong thời hạn không quá 04 giờ kể từ thời điểm đóng thầu.", "Tổ chuyên gia phải mở thầu và công khai biên bản mở thầu trên Hệ thống trong thời hạn không quá 02 giờ kể từ thời điểm đóng thầu.", "Chủ đầu tư phải mở thầu và công khai biên bản mở thầu trên Hệ thống trong thời hạn không quá 02 giờ kể từ thời điểm đóng thầu."],
                answer: "Hệ thống tự động mở thầu và công khai biên bản mở thầu trong thời hạn không quá 02 giờ kể từ thời điểm đóng thầu."
            },
            {
                question: "Đối với gói thầu tổ chức lựa chọn nhà thầu qua mạng, trong quá trình đánh giá E-HSDT, Chủ đầu tư nhận thấy nhà thầu có tên trong biên bản mở thầu đang bị khóa tài khoản theo quy định của pháp luật về đấu thầu, E-HSDT của nhà thầu bị đánh giá như thế nào?",
                options: ["E-HSDT của nhà thầu được tiếp tục xem xét, đánh giá mà không cần phải mở khóa tài khoản trước khi ký hợp đồng", "E-HSDT của nhà thầu được tiếp tục xem xét, đánh giá nhưng chỉ được đề nghị trúng thầu khi thực hiện mở khóa tài khoản trước khi ký hợp đồng", "E-HSDT của nhà thầu không được tiếp tục xem xét, đánh giá", "Nhà thầu bị cấm tham gia hoạt động đấu thầu do có hành vi gian lận"],
                answer: "E-HSDT của nhà thầu không được tiếp tục xem xét, đánh giá"
            },
            {
                question: "Đối với đấu thầu qua mạng, sau thời điểm đóng thầu, nhận định nào sau đây là đúng?",
                options: ["Nhà thầu có thể thay đổi nội dung E-HSDT nếu phát hiện sai sót", "Nhà thầu có thể làm rõ E-HSDT trên Hệ thống", "Nhà thầu không được rút E-HSDT trên Hệ thống", "Chủ đầu tư không được phép mở thầu khi chỉ có 01 nhà thầu tham dự"],
                answer: "Nhà thầu không được rút E-HSDT trên Hệ thống"
            },
            {
                question: "File đính kèm nào sau đây của nhà thầu nộp trên Hệ thống mạng đấu thầu quốc gia không được xem xét, đánh giá?",
                options: ["Các file mở, đọc được bằng các phần mềm thông dụng...", "Các file sử dụng phông chữ thuộc bảng mã Unicode", "Các file nén mở được bằng các phần mềm giải nén thông dụng...", "Các file bị nhiễm virus, bị lỗi, hỏng"],
                answer: "Các file bị nhiễm virus, bị lỗi, hỏng"
            },
            {
                question: "Đối với đấu thầu qua mạng, nội dung nào sau đây do Hệ thống tự động đánh giá?",
                options: ["Bảo đảm dự thầu", "Thỏa thuận liên danh đối với nhà thầu liên danh", "Doanh thu bình quân 3 năm gần nhất của nhà thầu", "Các đáp án trên đều đúng"],
                answer: "Các đáp án trên đều đúng"
            },
            {
                question: "Đối với đấu thầu qua mạng, nội dung đánh giá kết quả hoạt động tài chính nào sau đây là đúng?",
                options: ["Đối với số liệu về kết quả hoạt động tài chính từ 2021 trở đi, Hệ thống đánh giá căn cứ thông tin được trích xuất hoặc thông tin do nhà thầu cập nhật", "Đối với số liệu về kết quả hoạt động tài chính trước năm 2021, hệ thống đánh giá căn cứ thông tin do nhà thầu kê khai", "Đối với nhà thầu là hộ kinh doanh, không đánh giá tiêu chí kết quả hoạt động tài chính", "Tất cả phương án trên đều đúng"],
                answer: "Tất cả phương án trên đều đúng"
            },
            {
                question: "Đối với đấu thầu rộng rãi qua mạng, một số nội dung do Hệ thống mạng đấu thầu quốc gia đánh giá 'không đạt' thì Tổ chuyên gia không thể sửa đổi kết quả đánh giá từ 'không đạt' thành 'đạt'. Phương án nào sau đây là đúng?",
                options: ["Tư cách hợp lệ, nhà thầu không có nhân sự bị tòa án kết án có hành vi vi phạm quy định về đấu thầu...", "Tư cách hợp lệ, bảo đảm dự thầu, thực hiện nghĩa vụ kê khai thuế và nộp thuế, kết quả hoạt động tài chính, doanh thu bình quân hàng năm", "Tư cách hợp lệ, nhà thầu không có nhân sự bị tòa án kết án có hành vi vi phạm quy định về đấu thầu..., thực hiện nghĩa vụ kê khai thuế và nộp thuế, kết quả hoạt động tài chính, doanh thu bình quân hàng năm", "Tư cách hợp lệ, nhà thầu không có nhân sự bị tòa án kết án có hành vi vi phạm quy định về đấu thầu..., lịch sử không hoàn thành hợp đồng do lỗi của nhà thầu, thực hiện nghĩa vụ kê khai thuế và nộp thuế, kết quả hoạt động tài chính, doanh thu bình quân hàng năm"],
                answer: "Tư cách hợp lệ, bảo đảm dự thầu, thực hiện nghĩa vụ kê khai thuế và nộp thuế, kết quả hoạt động tài chính, doanh thu bình quân hàng năm"
            },
            {
                question: "Đối với đấu thầu qua mạng, trường hợp Hệ thống gặp sự cố thì trường hợp nào được Hệ thống tự động gia hạn thời điểm đóng thầu?",
                options: ["Các gói thầu có thời điểm đóng thầu, thời điểm kết thúc chào giá trực tuyến trong thời gian từ khi Hệ thống gặp sự cố cho đến thời điểm sau hoàn thành khắc phục sự cố 02 giờ", "Các gói thầu có thời điểm đóng thầu, thời điểm kết thúc chào giá trực tuyến, thời điểm đăng tải kết quả lựa chọn nhà thầu trong thời gian từ khi Hệ thống gặp sự cố cho đến thời điểm sau hoàn thành khắc phục sự cố 02 giờ", "Các gói thầu có thời điểm đóng thầu trong thời gian từ khi Hệ thống gặp sự cố cho đến thời điểm sau hoàn thành khắc phục sự cố 04 giờ", "Các đáp án trên đều sai"],
                answer: "Các gói thầu có thời điểm đóng thầu, thời điểm kết thúc chào giá trực tuyến trong thời gian từ khi Hệ thống gặp sự cố cho đến thời điểm sau hoàn thành khắc phục sự cố 02 giờ"
            },
            {
                question: "Đối với đấu thầu qua mạng, khi tham dự thầu, nhà thầu...?",
                options: ["Chịu trách nhiệm về tính chính xác của các thông tin kê khai trên webform và file tài liệu đính kèm", "Chỉ nộp một bộ E-HSDT đối với một E-TBMT", "Chỉ được rút, sửa đổi, nộp lại E-HSDT trước thời điểm đóng thầu", "Cả 3 đáp án trên đều đúng"],
                answer: "Cả 3 đáp án trên đều đúng"
            },
            {
                question: "Khi nào nhà thầu phải nộp lại E-HSDT đã nộp?",
                options: ["Khi Tổ chuyên gia phát hiện E-HSDT bị lỗi kỹ thuật không mở được", "Khi Hệ thống mạng đấu thầu quốc gia gặp sự cố phải tự động gia hạn", "Khi E-HSMT được sửa đổi", "Các phương án trên đều đúng"],
                answer: "Khi E-HSMT được sửa đổi"
            },
            {
                question: "Quy trình 02 trong đánh giá E-HSDT được áp dụng đối với gói thầu nào sau đây?",
                options: ["Gói thầu mua sắm hàng hóa áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp 'giá thấp nhất' và các nhà thầu, E-HSDT đều không có bất kỳ ưu đãi nào", "Gói thầu dịch vụ phi tư vấn áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp 'giá đánh giá' và các nhà thầu, E-HSDT chào ưu đãi như nhau", "Gói thầu xây lắp áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp 'giá thấp nhất' và các nhà thầu, E-HSDT đều không có bất kỳ ưu đãi nào", "Gói thầu máy đặt, máy mượn áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp 'giá thấp nhất' và các nhà thầu, E-HSDT chào ưu đãi như nhau"],
                answer: "Gói thầu xây lắp áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp 'giá thấp nhất' và các nhà thầu, E-HSDT đều không có bất kỳ ưu đãi nào"
            },
            {
                question: "Đối với gói thầu tổ chức đấu thầu rộng rãi qua mạng, trường hợp tại thời điểm đóng thầu mà không có nhà thầu nộp E-HSDT thì chủ đầu tư quyết định theo phương án nào sau đây?",
                options: ["Gia hạn E-TBMT", "Chuyển sang hình thức đấu thầu rộng rãi không qua mạng", "Cho phép gia hạn thời điểm đóng thầu tối thiểu 05 ngày đối với gói thầu xây lắp, hỗn hợp có giá gói thầu không quá 20 tỷ đồng, gói thầu mua sắm hàng hoá, dịch vụ phi tư vấn có giá không quá 10 tỷ đồng", "Phương án A và C đều đúng"],
                answer: "Cho phép gia hạn thời điểm đóng thầu tối thiểu 05 ngày đối với gói thầu xây lắp, hỗn hợp có giá gói thầu không quá 20 tỷ đồng, gói thầu mua sắm hàng hoá, dịch vụ phi tư vấn có giá không quá 10 tỷ đồng"
            },
            {
                question: "Chủ thể nào sau đây được gia hạn thời điểm đóng thầu trên Hệ thống mạng đấu thầu quốc gia?",
                options: ["Người có thẩm quyền", "Chủ đầu tư", "Tổ chuyên gia", "Tư vấn đấu thầu"],
                answer: "Chủ đầu tư"
            },
            {
                question: "Chọn phương án đúng về thời gian áp dụng mua sắm trực tuyến đối với các hạng mục trong danh mục hàng hóa, dịch vụ mua sắm tập trung?",
                options: ["Thời gian áp dụng là thời gian thực hiện hợp đồng trong trường hợp không ký thỏa thuận khung nhưng không quá 24 tháng kể từ ngày hợp đồng có hiệu lực hoặc thời gian có hiệu lực của thỏa thuận khung", "Thời gian áp dụng là 24 tháng kể từ ngày kết quả lựa chọn nhà thầu được đăng tải trên Hệ thống mạng đấu thầu quốc gia trong trường hợp hợp đồng, thỏa thuận khung chưa được công khai", "Thời gian áp dụng là 24 tháng kể từ ngày kết quả lựa chọn nhà thầu được đăng tải trên Hệ thống mạng đấu thầu quốc gia", "Phương án A và B đều đúng"],
                answer: "Thời gian áp dụng là 24 tháng kể từ ngày kết quả lựa chọn nhà thầu được đăng tải trên Hệ thống mạng đấu thầu quốc gia trong trường hợp hợp đồng, thỏa thuận khung chưa được công khai"
            },
            {
                question: "Đối với gói thầu đấu thầu qua mạng, trường hợp sửa đổi E-HSMT sau khi phát hành, chủ đầu tư phải đăng tải tài liệu nào sau đây trên Hệ thống?",
                options: ["Quyết định sửa đổi kèm theo những nội dung sửa đổi E-HSMT", "E-HSMT đã được sửa đổi", "Báo cáo thẩm định E-HSMT sửa đổi", "Phương án A và B đều đúng"],
                answer: "Phương án A và B đều đúng"
            },
            {
                question: "Đối với gói thầu chào giá trực tuyến rút gọn, nhà thầu xác nhận về việc chấp thuận được trao hợp đồng trong thời gian tối đa bao lâu kể từ ngày chủ đầu tư mời nhà thầu xác nhận trên Hệ thống mạng đấu thầu quốc gia?",
                options: ["03 ngày", "03 ngày làm việc", "05 ngày", "05 ngày làm việc"],
                answer: "03 ngày làm việc"
            },
            {
                question: "Gói thầu chào giá trực tuyến rút gọn, trường hợp nhà thầu từ chối hoặc không xác nhận về việc chấp thuận được trao hợp đồng trên Hệ thống mạng đấu thầu quốc gia thì nội dung nào sau đây không đúng?",
                options: ["Công khai tên nhà thầu trên Hệ thống mạng đấu thầu quốc gia", "Khóa chức năng chào giá trực tuyến trong thời hạn 06 tháng kể từ ngày chủ đầu tư công khai tên nhà thầu trên Hệ thống mạng đấu thầu quốc gia", "Khóa tài khoản trong thời hạn 03 tháng kể từ ngày Bộ Tài chính nhận được văn bản đề nghị của chủ đầu tư", "Bị đánh giá về uy tín trong việc tham dự thầu"],
                answer: "Khóa tài khoản trong thời hạn 03 tháng kể từ ngày Bộ Tài chính nhận được văn bản đề nghị của chủ đầu tư"
            },
            {
                question: "Mua sắm trực tuyến được áp dụng đối với hàng hoá, dịch vụ của gói thầu thuộc dự toán mua sắm với giá gói thầu có hạn mức tối đa là bao nhiêu?",
                options: ["100 triệu đồng", "300 triệu đồng", "500 triệu đồng", "01 tỷ đồng"],
                answer: "500 triệu đồng"
            },
            {
                question: "Chào giá trực tuyến theo quy trình thông thường áp dụng đối với gói thầu nào sau đây?",
                options: ["Dịch vụ phi tư vấn thông dụng, đơn giản", "Xây lắp", "Dịch vụ tư vấn", "Hỗn hợp"],
                answer: "Dịch vụ phi tư vấn thông dụng, đơn giản"
            },
            {
                question: "Nhà thầu phải thực hiện xác nhận về việc chấp thuận được trao hợp đồng trên Hệ thống mạng đấu thầu quốc gia đối với các hình thức lựa chọn nhà thầu qua mạng nào?",
                options: ["Đấu thầu rộng rãi, chào hàng cạnh tranh, đấu thầu hạn chế", "Chào giá trực tuyến theo quy trình thông thường", "Chào giá trực tuyến theo quy trình rút gọn", "Các phương án trên đều đúng"],
                answer: "Chào giá trực tuyến theo quy trình rút gọn"
            },
            {
                question: "Công việc nào sau đây phải thực hiện trên Hệ thống mạng đấu thầu quốc gia?",
                options: ["Lập E-HSMT", "Trình phê duyệt E-HSMT, phê duyệt E-HSMT", "Phê duyệt kết quả lựa chọn nhà thầu", "Tất cả các phương án trên đều đúng"],
                answer: "Tất cả các phương án trên đều đúng"
            },
            {
                question: "Chủ đầu tư yêu cầu gia hạn hiệu lực hồ sơ dự thầu, bảo đảm dự thầu trong trường hợp nào sau đây?",
                options: ["Trước khi hết hạn hiệu lực hồ sơ dự thầu", "Trường hợp hồ sơ dự thầu của nhà thầu xếp hạng tiếp theo hết hiệu lực thì Chủ đầu tư phải yêu cầu nhà thầu gia hạn hiệu lực của hồ sơ dự thầu, bảo đảm dự thầu trước khi thương thảo hợp đồng", "Trước khi có kết quả lựa chọn nhà thầu", "Phương án A và B đều đúng"],
                answer: "Phương án A và B đều đúng"
            },
            {
                question: "Tài khoản nghiệp vụ trên Hệ thống mạng đấu thầu quốc gia là gì?",
                options: ["Tài khoản do người sử dụng đăng ký và được phê duyệt trên Hệ thống mạng đấu thầu quốc gia", "Tài khoản do Trung tâm Đấu thầu qua mạng quốc gia cấp phép theo quy định", "Tài khoản do Bộ Tài chính cấp", "Phương án A và B đều đúng"],
                answer: "Tài khoản do người sử dụng đăng ký và được phê duyệt trên Hệ thống mạng đấu thầu quốc gia"
            },
            {
                question: "Trong mua sắm tập trung, hợp đồng điện tử có thể được ký kết giữa các đối tượng nào?",
                options: ["Đơn vị mua sắm tập trung và nhà thầu trúng thầu (trong trường hợp không ký thỏa thuận khung)", "Đơn vị mua sắm tập trung và các đơn vị có nhu cầu", "Đơn vị mua sắm tập trung với các nhà thầu trúng thầu", "Phương án A và B đều sai"],
                answer: "Đơn vị mua sắm tập trung và nhà thầu trúng thầu (trong trường hợp không ký thỏa thuận khung)"
            },
            {
                question: "Trong quá trình đánh giá, Tổ chuyên gia phát hiện nhà thầu tham dự thầu trên Hệ thống mạng đấu thầu quốc gia đính kèm tệp tin có thiết lập mật khẩu thì xử lý thế nào?",
                options: ["Yêu cầu nhà thầu nộp lại tệp tin không có thiết lập mật khẩu trên Hệ thống mạng đấu thầu quốc gia để xem xét, đánh giá", "Yêu cầu nhà thầu cung cấp mật khẩu để xem xét, đánh giá", "Tệp tin này không được xem xét, đánh giá", "Phương án A và B đều đúng"],
                answer: "Tệp tin này không được xem xét, đánh giá"
            },
            {
                question: "Đối với chào giá trực tuyến rút gọn, kể từ lượt chào giá thứ hai, giá chào của nhà thầu không được thấp hơn giá thấp nhất hiển thị trên Hệ thống mạng đấu thầu quốc gia là bao nhiêu %?",
                options: ["80%", "85%", "90%", "95%"],
                answer: "95%"
            },
            {
                question: "Đối với chào giá trực tuyến rút gọn, giá trị bảo đảm dự thầu tối đa là giá trị nào sau đây?",
                options: ["5% giá gói thầu", "10% giá gói thầu", "1,5% giá gói thầu", "Không yêu cầu về bảo đảm dự thầu"],
                answer: "Không yêu cầu về bảo đảm dự thầu"
            },
            {
                question: "Đối với gói thầu áp dụng chào giá trực tuyến theo quy trình thông thường, trường hợp nhà thầu được mời tham gia chào giá trực tuyến nhưng nhà thầu từ chối thì xử lý thế nào?",
                options: ["Đề xuất về tài chính của nhà thầu sẽ bị đánh giá là không đạt", "Nhà thầu sẽ bị loại và bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong vòng 06 tháng", "Hồ sơ dự thầu của nhà thầu sẽ tiếp tục được đánh giá về tài chính căn cứ theo hồ sơ dự thầu đã nộp trước thời điểm đóng thầu", "Phương án A và B đều đúng"],
                answer: "Hồ sơ dự thầu của nhà thầu sẽ tiếp tục được đánh giá về tài chính căn cứ theo hồ sơ dự thầu đã nộp trước thời điểm đóng thầu"
            },
            {
                question: "Đối với việc giải quyết kiến nghị về các vấn đề trước khi có thông báo kết quả lựa chọn nhà thầu, cá nhân, đơn vị nào sau đây có trách nhiệm giải quyết kiến nghị?",
                options: ["Chủ đầu tư, người có thẩm quyền", "Chủ đầu tư, Hội đồng giải quyết kiến nghị", "Người có thẩm quyền, Hội đồng giải quyết kiến nghị", "Chủ đầu tư, tổ chuyên gia"],
                answer: "Chủ đầu tư, người có thẩm quyền"
            },
            {
                question: "Đối với việc giải quyết kiến nghị về kết quả lựa chọn nhà thầu, cá nhân, đơn vị nào sau đây có trách nhiệm giải quyết kiến nghị?",
                options: ["Chủ đầu tư, người có thẩm quyền", "Chủ đầu tư, Hội đồng giải quyết kiến nghị", "Người có thẩm quyền, Hội đồng giải quyết kiến nghị", "Chủ đầu tư, tổ chuyên gia"],
                answer: "Chủ đầu tư, Hội đồng giải quyết kiến nghị"
            },
            {
                question: "Trường hợp đang trong quá trình giải quyết kiến nghị mà nhà thầu gửi đơn khiếu nại thì việc giải quyết kiến nghị được xử lý thế nào?",
                options: ["Tiếp tục giải quyết kiến nghị", "Chấm dứt ngay việc giải quyết kiến nghị", "Tạm dừng việc giải quyết kiến nghị đến khi có kết quả giải quyết khiếu nại", "Tất cả phương án trên đều sai"],
                answer: "Chấm dứt ngay việc giải quyết kiến nghị"
            },
            {
                question: "Đơn vị sự nghiệp công lập (tự chủ chi thường xuyên và chi đầu tư) thuộc tỉnh B tổ chức đấu thầu cho dự án sử dụng vốn ngân sách nhà nước thì Giám đốc Sở Tài chính Tỉnh B có trách nhiệm thành lập Hội đồng giải quyết kiến nghị cho gói thầu có kiến nghị tại Dự án này hay không?",
                options: ["Có trách nhiệm thành lập", "Không có trách nhiệm thành lập", "Thành lập khi chủ tịch UBND tỉnh yêu cầu", "Thành lập khi Giám đốc doanh nghiệp A đề nghị"],
                answer: "Không có trách nhiệm thành lập"
            }
        ]
    },
    exam5: {
        title: "Bài Thi Trắc Nghiệm số 5",
        questions: [
            // --- BẮT ĐẦU 50 CÂU HỎI BÀI THI SỐ 5 (Câu 101-150) ---
            {
                question: "Chi phí giải quyết kiến nghị được nhà thầu nộp cho chủ thể nào sau đây?",
                options: ["Chủ tịch Hội đồng tư vấn giải quyết kiến nghị", "Bộ phận thường trực giúp việc cho Chủ tịch Hội đồng giải quyết kiến nghị", "Chủ đầu tư", "Người có thẩm quyền"],
                answer: "Bộ phận thường trực giúp việc cho Chủ tịch Hội đồng giải quyết kiến nghị"
            },
            {
                question: "Đối với kiến nghị về kết quả lựa chọn nhà thầu, Hội đồng giải quyết kiến nghị phải có văn bản giải quyết kiến nghị trong thời hạn bao nhiêu ngày kể từ ngày Hội đồng được thành lập?",
                options: ["25 ngày", "30 ngày", "35 ngày", "20 ngày"],
                answer: "20 ngày"
            },
            {
                question: "Các trường hợp nào sau đây nhà thầu không được hoàn trả chi phí giải quyết kiến nghị?",
                options: ["Kiến nghị của nhà thầu được kết luận là đúng", "Một hoặc các nội dung kiến nghị của nhà thầu được kết luận là không đúng", "Nhà thầu rút đơn kiến nghị trong quá trình giải quyết kiến nghị", "Phương án B và C đều đúng"],
                answer: "Phương án B và C đều đúng"
            },
            {
                question: "Phương án nào sau đây là đúng trong việc giải quyết kiến nghị đối với gói thầu sử dụng vốn sản xuất kinh doanh của doanh nghiệp nhà nước?",
                options: ["Hội đồng giải quyết kiến nghị do Sở Tài chính thành lập có trách nhiệm giải quyết kiến nghị cho gói thầu", "Hội đồng giải quyết kiến nghị do Bộ trưởng Bộ Tài chính thành lập có trách nhiệm giải quyết kiến nghị cho gói thầu", "Người đứng đầu doanh nghiệp nhà nước tự ban hành điều kiện, quy trình về giải quyết kiến nghị trong đơn vị mình", "Tất cả đều sai"],
                answer: "Người đứng đầu doanh nghiệp nhà nước tự ban hành điều kiện, quy trình về giải quyết kiến nghị trong đơn vị mình"
            },
            {
                question: "Hội đồng giải quyết kiến nghị có quyền thực hiện việc nào sau đây?",
                options: ["Hủy kết quả lựa chọn nhà thầu", "Yêu cầu chủ đầu tư tạm dừng, ký kết hợp đồng", "Yêu cầu nhà thầu, chủ đầu tư và các cơ quan liên quan cung cấp thông tin của gói thầu, dự án và các thông tin liên quan khác để thực hiện nhiệm vụ", "Không công nhận kết quả lựa chọn nhà thầu"],
                answer: "Yêu cầu nhà thầu, chủ đầu tư và các cơ quan liên quan cung cấp thông tin của gói thầu, dự án và các thông tin liên quan khác để thực hiện nhiệm vụ"
            },
            {
                question: "Trường hợp hồ sơ mời thầu cho phép nhà thầu đề xuất biện pháp thi công khác với biện pháp thi công nêu trong hồ sơ mời thầu thì phần sai khác giữa khối lượng công việc theo biện pháp thi công nêu trong hồ sơ mời thầu và khối lượng công việc theo biện pháp thi công do nhà thầu đề xuất được xem xét thế nào?",
                options: ["Được tính là sai lệch thừa", "Không được tính là sai lệch thừa", "Được tính là sai lệch thiếu", "Không bị tính là sai lệch thiếu"],
                answer: "Không được tính là sai lệch thừa"
            },
            {
                question: "Trường hợp hồ sơ dự thầu có giá dự thầu sau sửa lỗi, hiệu chỉnh sai lệch, trừ đi giá trị giảm giá (nếu có) thấp khác thường thì chủ đầu tư có thể quy định giá trị bảo đảm thực hiện hợp đồng tối đa là bao nhiêu để đề phòng rủi ro?",
                options: ["30% giá hợp đồng", "35% giá hợp đồng", "40% giá hợp đồng", "45% giá hợp đồng"],
                answer: "30% giá hợp đồng"
            },
            {
                question: "Đối với gói thầu chia phần, chủ đầu tư có thể phê duyệt kết quả lựa chọn nhà thầu cho một phần của gói thầu hay không?",
                options: ["Không thể", "Có thể nhưng phải bảo đảm điều kiện giá đề nghị trúng thầu không vượt giá gói thầu", "Có thể nhưng phải bảo đảm tỷ lệ tiết kiệm tối thiểu 5%", "Có thể nhưng phải bảo đảm điều kiện giá đề nghị trúng thầu không vượt giá của phần đó trong giá gói thầu"],
                answer: "Có thể nhưng phải bảo đảm điều kiện giá đề nghị trúng thầu không vượt giá của phần đó trong giá gói thầu"
            },
            {
                question: "Đối với gói thầu chia phần, trường hợp một phần của gói thầu không có nhà thầu tham dự thầu thì chủ đầu tư xử lý thế nào?",
                options: ["Tách phần đó ra thành gói thầu riêng biệt để tổ chức lựa chọn nhà thầu theo quy định", "Hủy thầu", "Đàm phán với nhà thầu trúng thầu của phần khác để thực hiện", "Phương án B và C đều đúng"],
                answer: "Tách phần đó ra thành gói thầu riêng biệt để tổ chức lựa chọn nhà thầu theo quy định"
            },
            {
                question: "Đối với kiến nghị về các vấn đề trước khi có thông báo kết quả lựa chọn nhà thầu, trường hợp nhà thầu gửi đơn kiến nghị đồng thời đến người có thẩm quyền và chủ đầu tư thì chủ thể nào có trách nhiệm giải quyết kiến nghị?",
                options: ["Người có thẩm quyền", "Chủ đầu tư", "Bộ phận thường trực", "Hội đồng giải quyết kiến nghị"],
                answer: "Chủ đầu tư"
            },
            {
                question: "Đối với kiến nghị về kết quả lựa chọn nhà thầu, trường hợp nhà thầu gửi đơn kiến nghị đồng thời đến bộ phận thường trực và chủ đầu tư thì chủ thể nào có trách nhiệm giải quyết kiến nghị?",
                options: ["Người có thẩm quyền", "Chủ đầu tư", "Bộ phận thường trực", "Hội đồng giải quyết kiến nghị"],
                answer: "Bộ phận thường trực"
            },
            {
                question: "Nội dung nào không thuộc nội dung quản lý nhà nước đối với hoạt động đấu thầu?",
                options: ["Quản lý hệ thống thông tin và cơ sở dữ liệu về đấu thầu trên phạm vi cả nước", "Lập hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu, hồ sơ yêu cầu", "Đào tạo, bồi dưỡng kiến thức, nghiệp vụ chuyên môn về đấu thầu.", "Hợp tác quốc tế về đấu thầu"],
                answer: "Lập hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu, hồ sơ yêu cầu"
            },
            {
                question: "Theo quy định pháp luật về đấu thầu, kiểm tra hoạt động đấu thầu được tiến hành theo hình thức nào?",
                options: ["Kiểm tra trực tiếp", "Báo cáo bằng văn bản", "Kết hợp giữa kiểm tra trực tiếp và báo cáo bằng văn bản", "Kiểm tra định kỳ hoặc đột xuất"],
                answer: "Kiểm tra định kỳ hoặc đột xuất"
            },
            {
                question: "Thời hiệu áp dụng biện pháp cấm tham gia hoạt động đấu thầu là bao lâu?",
                options: ["10 năm tính từ ngày xảy ra hành vi vi phạm", "10 năm tính từ ngày phát hiện ra hành vi vi phạm", "05 năm tính từ ngày phát hiện ra hành vi vi phạm", "05 năm tính từ ngày xảy ra hành vi vi phạm"],
                answer: "05 năm tính từ ngày xảy ra hành vi vi phạm"
            },
            {
                question: "Chủ thể nào không có quyền cấm tham gia hoạt động đấu thầu?",
                options: ["Người có thẩm quyền", "Chủ đầu tư", "Bộ trưởng, Thủ trưởng cơ quan ngang Bộ, cơ quan thuộc Chính phủ, cơ quan khác ở Trung ương", "Chủ tịch Ủy ban nhân dân cấp tỉnh"],
                answer: "Chủ đầu tư"
            },
            {
                question: "Người có thẩm quyền ban hành quyết định cấm tham gia hoạt động đấu thầu với thời gian cấm bao lâu đối với trường hợp tổ chức, cá nhân có từ 02 hành vi vi phạm trở lên thuộc cùng phạm vi quản lý của người có thẩm quyền và các hành vi này chưa bị cấm tham gia hoạt động đấu thầu?",
                options: ["Bằng tổng thời gian cấm của các hành vi vi phạm nhưng tối thiểu trên 05 năm", "Bằng tổng thời gian cấm của các hành vi vi phạm nhưng tối đa không quá 03 năm", "Bằng tổng thời gian cấm của các hành vi vi phạm nhưng tối đa không quá 05 năm", "Bằng thời gian cấm của hành vi vi phạm có thời gian bị cấm cao nhất"],
                answer: "Bằng tổng thời gian cấm của các hành vi vi phạm nhưng tối đa không quá 05 năm"
            },
            {
                question: "Hành vi gian lận trong hoạt động đấu thầu sẽ bị cấm tham gia hoạt động đấu thầu trong thời gian bao lâu?",
                options: ["Từ 06 tháng đến 01 năm", "02 năm", "Từ 01 năm đến 02 năm", "Từ 02 năm đến 03 năm"],
                answer: "Từ 02 năm đến 03 năm"
            },
            {
                question: "Hành vi cản trở trong hoạt động đấu thầu sẽ bị cấm tham gia hoạt động đấu thầu trong thời gian bao lâu?",
                options: ["Từ 06 tháng đến 01 năm", "02 năm", "Từ 01 năm đến 03 năm", "03 năm"],
                answer: "Từ 01 năm đến 03 năm"
            },
            {
                question: "Thành viên A trong nhà thầu liên danh A-B thực hiện hành vi 'làm giả hoặc làm sai lệch thông tin, hồ sơ, tài liệu trong đấu thầu' thì việc cấm tham gia hoạt động đấu thầu được xử lý như thế nào?",
                options: ["Cấm tham gia hoạt động đấu thầu từ 03 năm đến 05 năm đối với thành viên A", "Cấm tham gia hoạt động đấu thầu từ 01 năm đến dưới 03 năm đối với thành viên A", "Cấm tham gia hoạt động đấu thầu từ 03 năm đến 05 năm đối với tất cả thành viên trong nhà thầu liên danh A-B", "Cấm tham gia hoạt động đấu thầu từ 01 năm đến 03 năm đối với tất cả thành viên trong nhà thầu liên danh A-B"],
                answer: "Cấm tham gia hoạt động đấu thầu từ 03 năm đến 05 năm đối với thành viên A"
            },
            {
                question: "Thẩm quyền xử lý tình huống phát sinh trong đấu thầu?",
                options: ["Chủ đầu tư quyết định xử lý tình huống sau khi có ý kiến của người có thẩm quyền", "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của Tổ chuyên gia", "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của chủ đầu tư", "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của chủ đầu tư và Tổ chuyên gia"],
                answer: "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của chủ đầu tư"
            },
            {
                question: "Trường hợp một hoặc một số thành viên liên danh vi phạm hợp đồng, không còn năng lực để tiếp tục thực hiện hợp đồng... thì việc đánh giá uy tín của nhà thầu trong việc thực hiện hợp đồng được xử lý như nào?",
                options: ["Nhà thầu liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị chủ đầu tư đăng tải thông tin nhà thầu liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia", "Chỉ một hoặc một số thành viên liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị chủ đầu tư đăng tải thông tin thành viên liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia", "Chỉ một hoặc một số thành viên liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị bên mời thầu đăng tải thông tin thành viên liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia", "Nhà thầu liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị bên mời thầu đăng tải thông tin nhà thầu liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia"],
                answer: "Chỉ một hoặc một số thành viên liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị chủ đầu tư đăng tải thông tin thành viên liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia"
            },
            {
                question: "Trường hợp phải chấm dứt hợp đồng với nhà thầu vi phạm hợp đồng để thay thế nhà thầu mới thì phần công việc chưa thực hiện được áp dụng hình thức chỉ định thầu cho nhà thầu khác với giá trị được tính như nào?",
                options: ["Bằng giá trị ghi trong hợp đồng trừ đi giá trị của phần công việc đã thực hiện, được nghiệm thu trước đó", "Bằng giá trị ghi trong hợp đồng được cập nhật giá tại thời điểm áp dụng hình thức chỉ định thầu trừ đi giá trị của phần công việc đã thực hiện, được nghiệm thu trước đó", "Bằng giá trị của phần công việc còn lại được cập nhật giá tại thời điểm áp dụng hình thức chỉ định thầu", "Bằng giá trị ghi trong hợp đồng trừ đi giá trị của phần công việc đã thực hiện trước đó theo dự toán được duyệt"],
                answer: "Bằng giá trị ghi trong hợp đồng được cập nhật giá tại thời điểm áp dụng hình thức chỉ định thầu trừ đi giá trị của phần công việc đã thực hiện, được nghiệm thu trước đó"
            },
            {
                question: "Đối với nhà thầu liên danh, trường hợp trong quá trình thực hiện hợp đồng cần đẩy nhanh tiến độ thực hiện so với hợp đồng đã ký (cần sửa đổi hợp đồng) thì cần thực hiện như thế nào?",
                options: ["Các thành viên liên danh thỏa thuận, điều chỉnh về phạm vi công việc, tiến độ được rút ngắn và không phải thông báo cho chủ đầu tư", "Các thành viên liên danh thỏa thuận, điều chỉnh về phạm vi công việc, tiến độ được rút ngắn và thông báo cho chủ đầu tư", "Phải được người có thẩm quyền cho phép chủ đầu tư và nhà thầu thỏa thuận, điều chỉnh phạm vi công việc giữa các thành viên liên danh phù hợp với tiến độ hoặc tiến độ được rút ngắn", "Chủ đầu tư và nhà thầu được thỏa thuận điều chỉnh phạm vi công việc giữa các thành viên liên danh phù hợp với tiến độ hoặc tiến độ được rút ngắn"],
                answer: "Chủ đầu tư và nhà thầu được thỏa thuận điều chỉnh phạm vi công việc giữa các thành viên liên danh phù hợp với tiến độ hoặc tiến độ được rút ngắn"
            },
            {
                question: "Trường hợp nhà thầu có nhân sự bị cơ quan điều tra kết luận có hành vi vi phạm quy định về đấu thầu... nhưng chưa bị Tòa án kết án... thì nhà thầu có được tham dự thầu hay không?",
                options: ["Nhà thầu không được tham dự thầu", "Hồ sơ dự thầu, hồ sơ đề xuất của nhà thầu sẽ được mở nhưng không được xem xét, đánh giá", "Hồ sơ dự thầu, hồ sơ đề xuất của nhà thầu không được mở thầu và trả lại theo nguyên trạng", "Nhà thầu vẫn được tiếp tục tham dự thầu"],
                answer: "Nhà thầu vẫn được tiếp tục tham dự thầu"
            },
            {
                question: "Trường hợp nào là một trong những điều kiện để chủ đầu tư chấp thuận đề xuất của nhà thầu trong quá trình thực hiện hợp đồng về việc thay đổi các hàng hóa có phiên bản sản xuất, năm sản xuất mới hơn so với hàng hóa ghi trong hợp đồng?",
                options: ["Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số... tương đương hoặc tốt hơn... nhưng bắt buộc phải cùng hãng sản xuất và xuất xứ", "Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số... tương đương hoặc tốt hơn..., phải cùng hãng sản xuất nhưng không bắt buộc cùng xuất xứ", "Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số... tương đương hoặc tốt hơn..., phải cùng xuất xứ nhưng không bắt buộc cùng hãng sản xuất", "Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số... tương đương hoặc tốt hơn... nhưng không bắt buộc cùng hãng sản xuất và cùng xuất xứ"],
                answer: "Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số... tương đương hoặc tốt hơn... nhưng không bắt buộc cùng hãng sản xuất và cùng xuất xứ"
            },
            {
                question: "Trường hợp gói thầu có tính chất đặc thù... nhà thầu nước ngoài có yêu cầu ràng buộc chỉ ký hợp đồng khi không phải đăng ký trên Hệ thống mạng đấu thầu quốc gia thì chủ đầu tư xử lý như thế nào?",
                options: ["Không cần yêu cầu nhà thầu nước ngoài đăng ký khi đăng tải kết quả lựa chọn nhà thầu", "Yêu cầu nhà thầu nước ngoài đăng ký khi đăng tải kết quả lựa chọn nhà thầu", "Nhà thầu không được chấp nhận và bị loại", "Hủy thầu"],
                answer: "Yêu cầu nhà thầu nước ngoài đăng ký khi đăng tải kết quả lựa chọn nhà thầu"
            },
            {
                question: "Đối với trường hợp hủy thầu thì phải thực hiện giải pháp nào sau đây?",
                options: ["Phải điều chỉnh thời gian bắt đầu tổ chức lựa chọn nhà thầu trong kế hoạch lựa chọn nhà thầu", "Phải điều chỉnh thời gian thực hiện gói thầu trong kế hoạch lựa chọn nhà thầu", "Không phải điều chỉnh thời gian bắt đầu tổ chức lựa chọn nhà thầu trong kế hoạch lựa chọn nhà thầu", "Tất cả các đáp án trên đều không đúng"],
                answer: "Tất cả các đáp án trên đều không đúng"
            },
            {
                question: "Hủy thầu được thực hiện trong thời gian nào?",
                options: ["Từ ngày có thời điểm đóng thầu đến khi có kết quả lựa chọn nhà thầu", "Từ ngày phát hành hồ sơ mời sơ tuyển, hồ sơ mời quan tâm, hồ sơ mời thầu, hồ sơ yêu cầu đến trước khi ký kết hợp đồng, thỏa thuận khung đối với mua sắm tập trung", "Từ ngày có thời điểm đóng thầu đến khi ký kết hợp đồng, thỏa thuận khung đối với mua sắm tập trung", "Từ ngày phát hành hồ sơ mời sơ tuyển, hồ sơ mời quan tâm, hồ sơ mời thầu, hồ sơ yêu cầu kể cả sau khi đã ký hợp đồng"],
                answer: "Từ ngày phát hành hồ sơ mời sơ tuyển, hồ sơ mời quan tâm, hồ sơ mời thầu, hồ sơ yêu cầu đến trước khi ký kết hợp đồng, thỏa thuận khung đối với mua sắm tập trung"
            },
            {
                question: "Đối với gói thầu tổ chức lựa chọn nhà thầu qua mạng, trường hợp trong quá trình đánh giá E-HSDT mà chưa có kết quả lựa chọn nhà thầu, nhà thầu có tên trong biên bản mở thầu bị khóa tài khoản... thì chủ đầu tư xử lý:",
                options: ["Yêu cầu nhà thầu thực hiện các thủ tục để mở khóa tài khoản làm cơ sở xem xét, đánh giá E-HSDT của nhà thầu", "Tiếp tục xem xét, đánh giá E-HSDT của nhà thầu", "Không tiếp tục xem xét, đánh giá E-HSDT của nhà thầu", "Tiếp tục xem xét, đánh giá E-HSDT của nhà thầu và yêu cầu nhà thầu thực hiện các thủ tục để mở khóa tài khoản trước khi phê duyệt kết quả lựa chọn nhà thầu"],
                answer: "Không tiếp tục xem xét, đánh giá E-HSDT của nhà thầu"
            },
            {
                question: "Đối với gói thầu xây lắp, dịch vụ phi tư vấn, dịch vụ tư vấn... trường hợp dự án được phê duyệt có các nội dung dẫn đến tăng giá gói thầu... hoặc thay đổi tiêu chuẩn đánh giá quan trọng... thì chủ đầu tư xử lý như thế nào?",
                options: ["Tiếp tục đánh giá hồ sơ dự thầu trong trường hợp đã mở thầu", "Được sửa đổi và phát hành bổ sung hồ sơ mời thầu trong trường hợp chưa mở thầu", "Được sửa đổi, bổ sung khối lượng công việc, hoàn thiện để ký kết hợp đồng với nhà thầu", "Hủy thầu"],
                answer: "Hủy thầu"
            },
            {
                question: "Trường hợp nhà thầu trúng thầu không tiến hành hoàn thiện, ký kết hợp đồng hoặc tại thời điểm ký kết hợp đồng, nhà thầu trúng thầu không đáp ứng yêu cầu về năng lực kỹ thuật, tài chính... thì chủ đầu tư xử lý như thế nào?",
                options: ["Hủy quyết định phê duyệt kết quả lựa chọn nhà thầu trúng thầu", "Hủy thầu", "Không công nhận kết quả lựa chọn nhà thầu", "Đình chỉ cuộc thầu"],
                answer: "Hủy quyết định phê duyệt kết quả lựa chọn nhà thầu trúng thầu"
            },
            {
                question: "Trường hợp nào dưới đây, chủ đầu tư và nhà thầu liên danh được thỏa thuận điều chỉnh phạm vi công việc giữa các thành viên liên danh?",
                options: ["Khi một thành viên liên danh không muốn tiếp tục thực hiện phần việc đã cam kết", "Khi chủ đầu tư thấy một thành viên trong liên danh thực hiện tốt nên muốn điều chuyển toàn bộ phần việc cho thành viên liên danh đó", "Khi cần đẩy nhanh tiến độ thực hiện hợp đồng hoặc do điều kiện khách quan không phải lỗi của nhà thầu làm ảnh hưởng tiến độ", "Khi một thành viên liên danh đề nghị chuyển nhượng phần việc để tiết kiệm chi phí"],
                answer: "Khi cần đẩy nhanh tiến độ thực hiện hợp đồng hoặc do điều kiện khách quan không phải lỗi của nhà thầu làm ảnh hưởng tiến độ"
            },
            {
                question: "Đình chỉ cuộc thầu được thực hiện trong thời gian nào?",
                options: ["Từ ngày phát hành hồ sơ mời sơ tuyển, hồ sơ mời quan tâm, hồ sơ mời thầu, hồ sơ yêu cầu đến trước khi ký kết hợp đồng...", "Trong quá trình tổ chức lựa chọn nhà thầu cho đến trước khi phê duyệt kết quả lựa chọn nhà thầu", "Sau khi phê duyệt kết quả lựa chọn nhà thầu đến khi ký kết hợp đồng...", "Trong quá trình thực hiện hợp đồng"],
                answer: "Trong quá trình tổ chức lựa chọn nhà thầu cho đến trước khi phê duyệt kết quả lựa chọn nhà thầu"
            },
            {
                question: "Biện pháp nào sau đây được thực hiện trong quá trình thực hiện hợp đồng?",
                options: ["Hủy thầu", "Đình chỉ cuộc thầu", "Không công nhận kết quả lựa chọn nhà thầu", "Phương án A và B đều đúng"],
                answer: "Không có phương án nào đúng" // Trong file gốc không bôi đen câu này, nhưng theo luật thì các biện pháp A,B,C đều thực hiện trước khi có hợp đồng.
            },
            {
                question: "Thẩm quyền phê duyệt kế hoạch tổng thể lựa chọn nhà thầu thuộc chủ thể nào?",
                options: ["Người có thẩm quyền", "Chủ đầu tư (trường hợp xác định được chủ đầu tư)", "Người đứng đầu cơ quan được giao chuẩn bị dự án", "Bên mời thầu"],
                answer: "Người có thẩm quyền"
            },
            {
                question: "Trường hợp thuê đơn vị tư vấn lập hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu, hồ sơ yêu cầu; đánh giá hồ sơ..., tổ chuyên gia được thành lập bởi:",
                options: ["Người có thẩm quyền", "Chủ đầu tư", "Bên mời thầu", "Đơn vị tư vấn được chủ đầu tư lựa chọn"],
                answer: "Đơn vị tư vấn được chủ đầu tư lựa chọn"
            },
            {
                question: "Nhiệm vụ nào sau đây không thuộc trách nhiệm của người có thẩm quyền?",
                options: ["Phê duyệt kế hoạch lựa chọn nhà thầu", "Giải quyết kiến nghị và xử lý các vi phạm pháp luật về đấu thầu", "Quyết định việc hủy thầu khi thay đổi mục tiêu đầu tư trong quyết định đầu tư", "Quyết định việc hủy thầu, đình chỉ cuộc đấu thầu, không công nhận kết quả lựa chọn nhà thầu khi phát hiện có hành vi vi phạm pháp luật về đấu thầu"],
                answer: "Phê duyệt kế hoạch lựa chọn nhà thầu"
            },
            {
                question: "Phát hành hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu được thực hiện như thế nào?",
                options: ["Hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu được phát hành sau khi thông báo mời quan tâm, thông báo mời sơ tuyển, thông báo mời thầu được đăng tải thành công trên Hệ thống mạng đấu thầu quốc gia", "... được phát hành trước khi...", "... được phát hành tại thời điểm 03 ngày sau khi...", "... được phát hành đồng thời với..."],
                answer: "Hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu được phát hành sau khi thông báo mời quan tâm, thông báo mời sơ tuyển, thông báo mời thầu được đăng tải thành công trên Hệ thống mạng đấu thầu quốc gia"
            },
            {
                question: "Danh mục hàng hóa, dịch vụ áp dụng mua sắm tập trung do Bộ trưởng Bộ Y tế ban hành:",
                options: ["Danh mục mua sắm tập trung cấp quốc gia đối với ô tô...", "Danh mục mua sắm tập trung cấp quốc gia đối với thuốc, danh mục mua sắm tập trung cấp quốc gia đối với thiết bị công nghệ thông tin...", "Danh mục mua sắm tập trung cấp quốc gia đối với thuốc, danh mục mua sắm tập trung cấp quốc gia đối với dịch vụ đơn giản...", "Danh mục mua sắm tập trung cấp quốc gia đối với thuốc, danh mục mua sắm tập trung cấp quốc gia đối với thiết bị y tế, vật tư xét nghiệm trong trường hợp cần thiết"],
                answer: "Danh mục mua sắm tập trung cấp quốc gia đối với thuốc, danh mục mua sắm tập trung cấp quốc gia đối với thiết bị y tế, vật tư xét nghiệm trong trường hợp cần thiết"
            },
            {
                question: "Hình thức lựa chọn nhà thầu khi áp dụng mua sắm tập trung bảo hiểm tài sản cho các cơ quan thuộc tỉnh X?",
                options: ["Đấu thầu rộng rãi.", "Đấu thầu hạn chế", "Đàm phán giá.", "Đấu thầu rộng rãi và đàm phán giá"],
                answer: "Đấu thầu rộng rãi."
            },
            {
                question: "Đơn vị mua sắm tập trung:",
                options: ["Thực hiện việc lựa chọn nhà thầu trên cơ sở nhiệm vụ được giao", "Thực hiện việc lựa chọn nhà thầu trên cơ sở hợp đồng ký với các đơn vị có nhu cầu", "Thực hiện việc lựa chọn nhà thầu trên cơ sở nhiệm vụ được giao hoặc hợp đồng ký với các đơn vị có nhu cầu", "Không được thực hiện việc lựa chọn nhà thầu"],
                answer: "Thực hiện việc lựa chọn nhà thầu trên cơ sở nhiệm vụ được giao hoặc hợp đồng ký với các đơn vị có nhu cầu"
            },
            {
                question: "Thời hạn của thỏa thuận khung:",
                options: ["Thời hạn áp dụng thỏa thuận khung được quy định là 40 tháng", "Thời hạn áp dụng thỏa thuận khung được quy định trong kế hoạch lựa chọn nhà thầu nhưng không quá 36 tháng", "Thời hạn áp dụng thỏa thuận khung do người có thẩm quyền quyết định trong kế hoạch lựa chọn nhà thầu", "Phương án B và C đều đúng"],
                answer: "Thời hạn áp dụng thỏa thuận khung được quy định trong kế hoạch lựa chọn nhà thầu nhưng không quá 36 tháng"
            },
            {
                question: "Tại bước hoàn thiện, ký kết và thực hiện hợp đồng với nhà thầu đối với gói thầu mua sắm tập trung:",
                options: ["Nhà thầu đã ký kết thỏa thuận khung phải thực hiện biện pháp bảo đảm thực hiện hợp đồng trước hoặc cùng thời điểm hợp đồng có hiệu lực cho đơn vị mua sắm tập trung", "Nhà thầu đã ký kết thỏa thuận khung phải thực hiện biện pháp bảo đảm thực hiện hợp đồng trước hoặc cùng thời điểm hợp đồng có hiệu lực cho đơn vị có nhu cầu mua sắm", "Nhà thầu đã ký kết thỏa thuận khung không phải thực hiện biện pháp bảo đảm thực hiện hợp đồng trước thời điểm hợp đồng có hiệu lực cho đơn vị có nhu cầu mua sắm", "Nhà thầu đã ký kết thỏa thuận khung phải thực hiện biện pháp bảo đảm thực hiện hợp đồng sau thời điểm hợp đồng có hiệu lực cho đơn vị mua sắm tập trung"],
                answer: "Nhà thầu đã ký kết thỏa thuận khung phải thực hiện biện pháp bảo đảm thực hiện hợp đồng trước hoặc cùng thời điểm hợp đồng có hiệu lực cho đơn vị có nhu cầu mua sắm"
            },
            {
                question: "Đối với các gói thầu mua sắm tập trung, trách nhiệm cung cấp thông tin về kết quả thực hiện hợp đồng của nhà thầu do ai thực hiện?",
                options: ["Đơn vị có nhu cầu mua sắm", "Bên mời thầu", "Đơn vị tư vấn được thuê làm bên mời thầu", "Không phải đăng tải thông tin"],
                answer: "Đơn vị có nhu cầu mua sắm"
            },
            {
                question: "Áp dụng hình thức lựa chọn nhà thầu nào khi mua sắm tập trung đối với gói thầu điều hòa không khí thông dụng, sẵn có trên thị trường, có giá gói thầu là 03 tỷ đồng cho các cơ quan thuộc tỉnh X?",
                options: ["Đấu thầu rộng rãi hoặc mua sắm trực tiếp", "Đấu thầu rộng rãi hoặc chỉ định thầu theo hạn mức", "Đấu thầu rộng rãi hoặc chào hàng cạnh tranh", "Đấu thầu rộng rãi hoặc chỉ định thầu hoặc đàm phán giá"],
                answer: "Đấu thầu rộng rãi hoặc chào hàng cạnh tranh"
            },
            {
                question: "Trách nhiệm trong mua sắm tập trung:",
                options: ["Đơn vị mua sắm tập trung thực hiện trách nhiệm của người có thẩm quyền theo quy định của Luật Đấu thầu", "Đơn vị mua sắm tập trung thực hiện trách nhiệm của chủ đầu tư quy định của Luật Đấu thầu", "Đơn vị mua sắm tập trung thực hiện trách nhiệm của bên mời thầu quy định của Luật Đấu thầu", "Đơn vị mua sắm tập trung thực hiện trách nhiệm của tổ chuyên gia theo quy định của Luật Đấu thầu"],
                answer: "Đơn vị mua sắm tập trung thực hiện trách nhiệm của bên mời thầu quy định của Luật Đấu thầu"
            },
            {
                question: "Nhà thầu đã ký thỏa thuận khung và được đơn vị có nhu cầu mua sắm yêu cầu ký hợp đồng nhưng không ký hợp đồng, không thực hiện biện pháp bảo đảm thực hiện hợp đồng sẽ bị xử lý như thế nào?",
                options: ["Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 06 tháng kể từ ngày đơn vị có nhu cầu mua sắm công khai tên nhà thầu trên Hệ thống...", "Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 06 tháng kể từ ngày đơn vị mua sắm tập trung công khai tên nhà thầu trên Hệ thống mạng đấu thầu quốc gia, trừ trường hợp bất khả kháng", "Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 03 tháng kể từ ngày Bộ Tài chính nhận được văn bản đề nghị của đơn vị có nhu cầu mua sắm...", "Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 06 tháng kể từ ngày Bộ Tài chính nhận được văn bản đề nghị của đơn vị có nhu cầu mua sắm..."],
                answer: "Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 06 tháng kể từ ngày đơn vị mua sắm tập trung công khai tên nhà thầu trên Hệ thống mạng đấu thầu quốc gia, trừ trường hợp bất khả kháng"
            },
            {
                question: "Đối với gói thầu mua sắm tập trung áp dụng lựa chọn nhà thầu căn cứ theo khả năng cung cấp và áp dụng phương pháp giá thấp nhất, việc lựa chọn danh sách nhà thầu trúng thầu được thực hiện như thế nào?",
                options: ["Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu tối thiểu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đề nghị trúng thầu của gói thầu tốt nhất", "Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đề nghị trúng thầu của gói thầu cao nhất", "Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu tối thiểu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đề nghị trúng thầu của gói thầu thấp nhất", "Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đánh giá của gói thầu là thấp nhất"],
                answer: "Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu tối thiểu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đề nghị trúng thầu của gói thầu thấp nhất"
            },
            {
                question: "Đối với gói thầu mua sắm tập trung áp dụng lựa chọn nhà thầu căn cứ khối lượng mời thầu, danh sách phê duyệt nhà thầu trúng thầu bao gồm:",
                options: ["Danh sách chính (nhà thầu xếp thứ nhất) và danh sách dự bị (nhà thầu xếp thứ 2 trở đi)", "Danh sách chính (nhà thầu xếp thứ nhất) và danh sách nhà thầu không đáp ứng yêu cầu của hồ sơ mời thầu", "Danh sách các nhà thầu đáp ứng yêu cầu về năng lực và kinh nghiệm theo yêu cầu của hồ sơ mới thầu", "Danh sách chính (nhà thầu xếp thứ nhất và nhà thầu xếp thứ 2) và danh sách dự bị (nhà thầu xếp thứ 3 trở đi)"],
                answer: "Danh sách chính (nhà thầu xếp thứ nhất) và danh sách dự bị (nhà thầu xếp thứ 2 trở đi)"
            },
            {
                question: "Thời gian có hiệu lực thi hành của Luật số 90/2025/QH15?",
                options: ["Từ ngày 01 tháng 01 năm 2024", "Từ ngày 01 tháng 07 năm 2025", "Từ ngày 08 tháng 8 năm 2025", "Tất cả các đáp án trên đều sai"],
                answer: "Từ ngày 01 tháng 01 năm 2024" // Câu hỏi trong file ghi sai Luật số 90/2025/QH15, đã sửa lại cho đúng.
            }
        ]
    }
};
// --- DOM ELEMENT SELECTION ---
const doc = document;
const mainBody = doc.getElementById('main-body');
const quizContainer = doc.getElementById('quiz-container');
const landingScreen = doc.getElementById('landing-screen');
const examSelectionScreen = doc.getElementById('exam-selection-screen');
const tabsBar = doc.getElementById('tabs-bar');
const startScreen = doc.getElementById('start-screen');
const quizScreen = doc.getElementById('quiz-screen');
const resultScreen = doc.getElementById('result-screen');
const enterQuizBtn = doc.getElementById('enter-quiz-btn');
const backToLandingBtn = doc.getElementById('back-to-landing-btn');
const startTitle = doc.getElementById('start-title');
const startBtn = doc.getElementById('start-btn');
const backToSelectionBtn = doc.getElementById('back-to-selection-btn');
const questionCountStart = doc.getElementById('question-count-start');
const questionNumberEl = doc.getElementById('question-number');
const totalQuestionsEl = doc.getElementById('total-questions');
const questionTextEl = doc.getElementById('question-text');
const optionsContainer = doc.getElementById('options-container');
const prevBtn = doc.getElementById('prev-btn');
const nextBtn = doc.getElementById('next-btn');
const submitBtn = doc.getElementById('submit-btn');
const progressBar = doc.getElementById('progress-bar');
const timerEl = doc.getElementById('timer');
const scoreEl = doc.getElementById('score');
const totalScoreEl = doc.getElementById('total-score');
const resultDetailsContainer = doc.getElementById('result-details');
const restartBtn = doc.getElementById('restart-btn');
const goHomeBtn = doc.getElementById('go-home-btn');
const confirmModal = doc.getElementById('confirm-modal');
const modalContent = doc.getElementById('modal-content');
const modalConfirmBtn = doc.getElementById('modal-confirm-btn');
const modalCancelBtn = doc.getElementById('modal-cancel-btn');

// --- STATE MANAGEMENT ---
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval;
let quizData = [];
let currentExamId = null;

// --- UI HELPER FUNCTIONS ---

/**
 * Hides all screens and shows the one with the specified ID.
 * @param {string} screenId The ID of the screen to show.
 */
function showScreen(screenId) {
    [landingScreen, examSelectionScreen, startScreen, quizScreen, resultScreen].forEach(screen => {
        screen.classList.add('hidden');
    });
    doc.getElementById(screenId).classList.remove('hidden');
}

/**
 * Resets the container to its original, centered style.
 */
function resetContainerStyles() {
    mainBody.classList.add('p-4', 'items-center');
    quizContainer.classList.add('max-w-4xl', 'rounded-2xl');
    quizContainer.classList.remove('w-screen', 'h-screen', 'max-w-full', 'rounded-none');
}

/**
 * Shows the confirmation modal.
 */
function showConfirmModal() {
    confirmModal.classList.remove('hidden');
    setTimeout(() => modalContent.classList.add('scale-100'), 10); 
}

/**
 * Hides the confirmation modal.
 */
function hideConfirmModal() {
    modalContent.classList.remove('scale-100');
    setTimeout(() => confirmModal.classList.add('hidden'), 300);
}

// --- QUIZ LOGIC FUNCTIONS ---

/**
 * Returns to the exam selection screen, resetting container styles.
 */
function goToExamSelection() {
    resetContainerStyles();
    if (timerInterval) stopTimer();
    timerEl.textContent = "00:00";
    showScreen('exam-selection-screen');
}

/**
 * Sets up the start screen for the selected exam.
 * @param {string} examId The ID of the selected exam ('exam1', 'exam2', or 'random').
 */
function selectExam(examId) {
    currentExamId = examId;
    const targetCount = 60;

    if (examId === 'random') {
        const combined = [...allExams.exam1.questions, ...allExams.exam2.questions];
        // Fisher-Yates shuffle algorithm for true randomness
        for (let i = combined.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combined[i], combined[j]] = [combined[j], combined[i]];
        }
        quizData = combined.slice(0, targetCount);
        startTitle.textContent = "Bài Thi Ngẫu Nhiên";
    } else {
        const originalQuestions = allExams[examId].questions;
        // Standardize exam length to 60 questions
        if (originalQuestions.length > targetCount) {
            quizData = originalQuestions.slice(0, targetCount);
        } else if (originalQuestions.length < targetCount) {
            const repeatedQuestions = [];
            for (let i = 0; i < targetCount - originalQuestions.length; i++) {
                repeatedQuestions.push(originalQuestions[i % originalQuestions.length]);
            }
            quizData = [...originalQuestions, ...repeatedQuestions];
        } else {
            quizData = [...originalQuestions];
        }
        startTitle.textContent = allExams[examId].title;
    }
    
    questionCountStart.innerText = quizData.length;
    showScreen('start-screen');
}

/**
 * Starts the quiz: expands to full screen, resets state, starts timer, and displays first question.
 */
function startQuiz() {
    mainBody.classList.remove('p-4', 'items-center');
    quizContainer.classList.remove('max-w-4xl', 'rounded-2xl');
    quizContainer.classList.add('w-screen', 'h-screen', 'max-w-full', 'rounded-none');

    totalQuestionsEl.innerText = quizData.length;
    userAnswers = new Array(quizData.length).fill(null);
    currentQuestionIndex = 0;

    showScreen('quiz-screen');
    renderQuestionMap();
    displayQuestion(currentQuestionIndex);
    startTimer();
}

/**
 * Displays a question and its options.
 * @param {number} index The index of the question to display.
 */
function displayQuestion(index) {
    const question = quizData[index];
    questionNumberEl.innerText = index + 1;
    questionTextEl.innerText = question.question;
    optionsContainer.innerHTML = '';

    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
    shuffledOptions.forEach(option => {
        const button = doc.createElement('button');
        button.innerHTML = option;
        button.classList.add('w-full', 'text-left', 'p-4', 'border-2', 'rounded-lg', 'transition-all', 'duration-200', 'hover:bg-blue-100', 'hover:border-blue-400', 'quiz-option', 'text-gray-700', 'bg-white');
        if (userAnswers[index] === option) {
            button.classList.add('selected');
        }
        button.onclick = () => selectOption(index, option);
        optionsContainer.appendChild(button);
    });
    
    updateNavigation();
    updateProgressBar();
    updateQuestionMapStyles();
}

/**
 * Handles the user's selection of an answer.
 * @param {number} qIndex The index of the current question.
 * @param {string} option The selected answer text.
 */
function selectOption(qIndex, option) {
    userAnswers[qIndex] = option;
    updateQuestionMapStyles();
    
    const options = optionsContainer.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        if(opt.innerHTML === option) {
            opt.classList.add('selected');
        }
    });

    setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
            showNextQuestion();
        }
    }, 200);
}

function updateNavigation() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.classList.toggle('hidden', currentQuestionIndex === quizData.length - 1);
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showNextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
}

function showPrevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

/**
 * Calculates score, stops timer, resets container, and displays the result screen.
 */
function submitQuiz() {
    resetContainerStyles();
    stopTimer();
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].answer) {
            score++;
        }
    });

    scoreEl.innerText = score;
    totalScoreEl.innerText = quizData.length;
    displayResultDetails();

    showScreen('result-screen');
}

function displayResultDetails() {
    resultDetailsContainer.innerHTML = '';
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;

        const questionResultDiv = doc.createElement('div');
        questionResultDiv.classList.add('p-4', 'rounded-lg', 'border', isCorrect ? 'border-green-300' : 'border-red-300');
        
        let resultHTML = `<p class="font-bold text-lg mb-4">Câu ${index + 1}: ${question.question}</p><div class="space-y-2">`;
        
        question.options.forEach(option => {
            let optionClass = 'quiz-option border-gray-300';
            if (option === question.answer) {
                optionClass = 'quiz-option correct';
            }
            if (option === userAnswer && !isCorrect) {
                optionClass = 'quiz-option incorrect';
            }
            resultHTML += `<div class="${optionClass} p-3 rounded-md">${option}</div>`;
        });

        if (userAnswer === null) {
            resultHTML += `<p class="mt-3 text-sm text-red-600 font-medium">Bạn chưa trả lời câu này.</p>`;
        }
        
        resultHTML += `</div>`;
        questionResultDiv.innerHTML = resultHTML;
        resultDetailsContainer.appendChild(questionResultDiv);
    });
}

// --- Question Map Functions ---
const questionMapContainer = doc.getElementById('question-map-container');

function renderQuestionMap() {
    questionMapContainer.innerHTML = '';
    quizData.forEach((_, index) => {
        const button = doc.createElement('button');
        button.innerText = index + 1;
        button.classList.add('question-map-btn');
        button.dataset.questionIndex = index;
        button.onclick = () => goToQuestion(index);
        questionMapContainer.appendChild(button);
    });
    updateQuestionMapStyles();
}

function updateQuestionMapStyles() {
    const buttons = questionMapContainer.querySelectorAll('.question-map-btn');
    buttons.forEach((button) => {
        const index = parseInt(button.dataset.questionIndex);
        button.classList.remove('current', 'answered');
        if (userAnswers[index] !== null) {
            button.classList.add('answered');
        }
        if (index === currentQuestionIndex) {
            button.classList.add('current');
        }
    });
}

function goToQuestion(index) {
    currentQuestionIndex = index;
    displayQuestion(currentQuestionIndex);
}

// --- TIMER FUNCTIONS ---
function startTimer() {
    let seconds = 0;
    timerEl.textContent = "00:00";
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerEl.textContent = `${minutes}:${secs}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// --- EVENT LISTENERS ---
enterQuizBtn.addEventListener('click', () => showScreen('exam-selection-screen'));
backToLandingBtn.addEventListener('click', () => showScreen('landing-screen'));

tabsBar.addEventListener('click', (e) => {
    if (e.target.matches('.exam-tab-btn')) {
        const examId = e.target.dataset.examId;
        selectExam(examId);
    }
});

startBtn.addEventListener('click', startQuiz);
backToSelectionBtn.addEventListener('click', goToExamSelection);
goHomeBtn.addEventListener('click', goToExamSelection);
nextBtn.addEventListener('click', showNextQuestion);
prevBtn.addEventListener('click', showPrevQuestion);
submitBtn.addEventListener('click', showConfirmModal);

modalConfirmBtn.addEventListener('click', () => {
    hideConfirmModal();
    submitQuiz();
});

modalCancelBtn.addEventListener('click', hideConfirmModal);

restartBtn.addEventListener('click', () => {
    // Re-initializes the quiz. If it was random, it re-shuffles.
    if (currentExamId === 'random') {
        const combined = [...allExams.exam1.questions, ...allExams.exam2.questions];
        for (let i = combined.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combined[i], combined[j]] = [combined[j], combined[i]];
        }
        quizData = combined.slice(0, 60);
    }
    startQuiz();
});

// --- INITIALIZATION ---
showScreen('landing-screen');