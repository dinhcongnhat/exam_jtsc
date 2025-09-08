import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp, doc, getDoc, writeBatch } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = typeof __firebase_config !== 'undefined' 
    ? JSON.parse(__firebase_config)
    : {
        apiKey: "AIzaSyCE9pYi-F8f8aJ66GvhlgrXVnTdJBz4sNc",
        authDomain: "jtscdb.firebaseapp.com",
        projectId: "jtscdb",
        storageBucket: "jtscdb.firebasestorage.app",
        messagingSenderId: "Y676905178628",
        appId: "1:676905178628:web:5242a9e2cfedf0b7640751"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// --- CÁC BỘ CÂU HỎI ---
const allQuizzes = {
    exam1: {
        title: "Đề 1",
        description: "Đề bài gồm 50 câu, thời gian làm bài 100 phút!",
        questions: [
            { question: "Trường hợp nào sau đây bắt buộc phải lựa chọn nhà thầu theo quy định tại Luật Đấu thầu?", options: ["Gói thầu thuộc dự án sử dụng vốn ngân sách nhà nước của cơ quan nhà nước", "Lựa chọn nhà thầu của doanh nghiệp nhà nước không sử dụng vốn ngân sách nhà nước", "Lựa chọn nhà thầu của đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên không sử dụng ngân sách nhà nước", "Gói thầu mua sắm điện nước, xăng dầu của cơ quan nhà nước"], correctAnswer: 0 },
    { question: "Chọn phương án đúng về phạm vi điều chỉnh của Luật Đấu thầu?", options: ["Quy định về quản lý nhà nước đối với hoạt động đấu thầu", "Quy định về thẩm quyền và trách nhiệm của các cơ quan, tổ chức, cá nhân trong hoạt động đấu thầu", "Quy định về hoạt động lựa chọn nhà thầu thực hiện gói thầu, hoạt động lựa chọn nhà đầu tư thực hiện dự án đầu tư kinh doanh", "Tất cả phương án trên đều đúng"], correctAnswer: 3 },
    { question: "Trường hợp nào sau đây không thuộc đối tượng áp dụng của Luật Đấu thầu?", options: ["Gói thầu mua thuốc, hoá chất, vật tư xét nghiệm sử dụng nguồn ngân sách nhà nước của bệnh viện công lập A", "Gói thầu xây dựng đường giao thông sử dụng vốn đầu tư công do Ban Quản lý dự án đầu tư xây dựng công trình tỉnh A làm chủ đầu tư", "Gói thầu mua sắm trang thiết bị làm việc sử dụng vốn nhà nước của Văn phòng UBND tỉnh A", "Hoạt động mua phần mềm kế toán của hộ kinh doanh cá thể"], correctAnswer: 3 },
    { question: "Theo quy định pháp luật về đấu thầu, gói thầu nào được xếp vào gói thầu cung cấp dịch vụ tư vấn?", options: ["Thiết kế và cung cấp hệ thống xử lý nước thải", "Gói thầu lập nhiệm vụ quy hoạch vùng", "Gói thầu quảng cáo trên nền tảng xã hội và phát sóng trên VTV", "Gói thầu mua phần mềm kế toán MISA"], correctAnswer: 1 },
    { question: "Gói thầu nào là gói thầu cung cấp dịch vụ phi tư vấn?", options: ["Gói thầu in sổ công tác của tỉnh A", "Gói thầu thuê kiểm toán dự án", "Gói thầu mua phần mềm kế toán hỗ trợ doanh nghiệp khởi nghiệp sáng tạo, doanh nghiệp nhỏ do phụ nữ làm chủ", "Gói thầu xây dựng trụ sở làm việc của tỉnh A"], correctAnswer: 0 },
    { question: "Theo quy định pháp luật về đấu thầu, đấu thầu là gì?", options: ["Là quá trình lựa chọn nhà thầu để ký kết, thực hiện hợp đồng cung cấp dịch vụ tư vấn, dịch vụ phi tư vấn, mua sắm hàng hóa, xây lắp...", "Là quá trình lựa chọn nhà đầu tư để ký kết, thực hiện hợp đồng dự án đầu tư kinh doanh...", "Là quá trình lựa chọn đơn vị để thực hiện hợp đồng thông qua các quy trình, thủ tục do pháp luật đấu thầu quy định.", "Phương án A và B đều đúng"], correctAnswer: 3 },
    { question: "Đấu thầu quốc tế là gì?", options: ["Là hoạt động đấu thầu mà nhà thầu trong nước, nước ngoài được tham dự thầu", "Là hoạt động đấu thầu mà nhà thầu trong nước, nước ngoài được tham dự thầu, trong đó nhà thầu trong nước bắt buộc phải liên danh với nhà thầu nước ngoài", "Là hoạt động đấu thầu chỉ nhà thầu quốc tế được phép tham dự thầu", "Là hoạt động đấu thầu chỉ nhà thầu trong nước được phép tham dự thầu"], correctAnswer: 0 },
    { question: "Giá đề nghị trúng thầu là gì?", options: ["Là giá dự thầu của nhà thầu ghi trong quyết định phê duyệt kết quả lựa chọn nhà thầu.", "Là giá dự thầu của nhà thầu được đề nghị trúng thầu sau khi đã được sửa lỗi, hiệu chỉnh sai lệch theo yêu cầu của hồ sơ mời thầu, hồ sơ yêu cầu, trừ đi giá trị giảm giá (nếu có)", "Là giá dự thầu của nhà thầu chưa tính sửa lỗi, hiệu chỉnh sai lệch và giá trị giảm giá (nếu có)", "Là giá trị ghi trong hợp đồng giữa chủ đầu tư và nhà thầu"], correctAnswer: 1 },
    { question: "Theo quy định pháp luật về đấu thầu, hàng hóa gồm?", options: ["Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng; sản phẩm; phương tiện; hàng tiêu dùng, phần mềm thương mại", "Thuốc, hóa chất, vật tư xét nghiệm, thiết bị y tế", "Phương án A và B đều đúng", "Logistics, bảo hiểm, quảng cáo, nghiệm thu chạy thử, chụp ảnh vệ tinh"], correctAnswer: 2 },
    { question: "Đối tượng được hưởng ưu đãi trong lựa chọn nhà thầu là gì?", options: ["Hàng hóa có xuất xứ Việt Nam", "Nhà thầu trong nước sản xuất hàng hóa có xuất xứ Việt Nam phù hợp với hồ sơ mời thầu", "Sản phẩm, dịch vụ thân thiện môi trường theo quy định của pháp luật về bảo vệ môi trường", "Tất cả các phương án trên đều đúng"], correctAnswer: 3 },
    { question: "Nhà thầu trong nước nào được hưởng ưu đãi trong lựa chọn nhà thầu?", options: ["Nhà thầu trong nước sản xuất hàng hóa có xuất xứ Việt Nam phù hợp với hồ sơ mời thầu", "Nhà thầu trong nước tham dự thầu với tư cách độc lập hoặc liên danh với nhà thầu  trong nước khác khi tham dự đấu thầu quốc tế", "Nhà thầu có sử dụng lao động nữ, thương binh, người khuyết tật hoặc người dân tộc thiểu số", "Tất cả các phương án trên đều đúng"], correctAnswer: 3 },
    { question: "Trường hợp nào sau đây cơ quan, tổ chức, doanh nghiệp được tự quyết định việc lựa chọn nhà thầu trên cơ sở bảo đảm công khai, minh bạch, hiệu quả và trách nhiệm giải trình?", options: ["Thực hiện gói thầu thuộc dự án sử dụng vốn đầu tư công của cơ quan nhà nước", "Thực hiện gói thầu thuộc dự án sử dụng vốn đầu tư công của đơn vị sự nghiệp công lập bảo đảm một phần chi thường xuyên", "Thực hiện gói thầu thuộc dự án sử dụng vốn ngân sách nhà nước của doanh nghiệp nhà nước", "Lựa chọn nhà thầu của doanh nghiệp nhà nước không sử dụng vốn ngân sách nhà nước, đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên và chủ đầu tư, đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên không sử dụng ngân sách nhà nước"], correctAnswer: 3 },
    { question: "Điều kiện để tổ chức đấu thầu quốc tế lựa chọn nhà thầu thực hiện gói thầu mua sắm hàng hóa là gì?", options: ["Gói thầu mua sắm hàng hóa thông dụng, đơn giản, có sẵn trên thị trường", "Gói thầu mua sắm hàng hóa mà hàng hóa đó trong nước sản xuất được và đáp ứng các yêu cầu về kỹ thuật, chất lượng, giá nhưng chủ đầu tư yêu cầu phải mua hàng hóa nhập khẩu", "Gói thầu mua sắm hàng hóa mà hàng hóa đó trong nước không sản xuất được hoặc sản xuất được nhưng không đáp ứng một trong các yêu cầu về kỹ thuật, chất lượng, giá", "Gói thầu mua sắm hàng hóa thông dụng đã được nhập khẩu và chào bán tại Việt Nam nhưng hàng hóa đó trong nước không sản xuất được"], correctAnswer: 2 },
    { question: "Ngôn ngữ sử dụng đối với đấu thầu quốc tế là gì?", options: ["Tiếng Việt", "Tiếng Đức", "Tiếng Anh hoặc tiếng Việt và tiếng Anh", "Tiếng Anh"], correctAnswer: 2 },
    { question: "Đối với đấu thầu quốc tế, trường hợp ngôn ngữ sử dụng trong hồ sơ mời thầu là tiếng Việt và tiếng Anh thì khi tham dự thầu, nhà thầu sử dụng ngôn ngữ gì?", options: ["Chỉ tiếng Việt", "Chỉ tiếng Anh", "Tiếng Việt hoặc tiếng Anh", "Bắt buộc cả tiếng Việt và tiếng Anh"], correctAnswer: 2 },
    { question: "Trong trường hợp hủy thầu, toàn bộ hồ sơ liên quan đến quá trình lựa chọn nhà thầu của gói thầu đó có cần phải lưu trữ không?", options: ["Không cần lưu trữ, hủy hồ sơ ngay sau khi quyết định hủy thầu được ban hành nhưng phải đảm bảo thông tin không bị tiết lộ", "Không cần lưu trữ, trả lại hồ sơ cho nhà thầu theo nguyên trạng ngay sau khi quyết định hủy thầu được ban hành", "Có cần lưu trữ, trong thời hạn 05 năm kể từ ngày quyết định hủy thầu được ban hành", "Có cần lưu trữ, trong thời hạn 03 năm kể từ ngày quyết định hủy thầu được ban hành"], correctAnswer: 2 },
    { question: "Trường hợp hồ sơ đề xuất về tài chính của Nhà thầu không vượt qua bước đánh giá về kỹ thuật, Nhà thầu từ chối nhận lại hồ sơ đề xuất của mình thì Chủ đầu tư phải:", options: ["Chủ đầu tư xem xét, quyết định việc hủy hồ sơ nhưng phải đảm bảo thông tin không bị tiết lộ", "Chủ đầu tư phải lưu trữ theo quy định của pháp luật về lưu trữ", "Chủ đầu tư lưu trữ tối thiểu 05 năm", "Tất cả các phương án trên đều sai"], correctAnswer: 1 },
    { question: "Hồ sơ hoàn công và quyết toán của gói thầu được lưu trữ theo quy định nào?", options: ["Quy định nội bộ của nhà thầu", "Quy định của tư vấn giám sát", "Quy định của pháp luật về lưu trữ", "Tất cả phương án trên đều sai"], correctAnswer: 2 },
    { question: "Đối với gói thầu xây lắp đấu thầu không qua mạng, hồ sơ đề xuất tài chính của nhà thầu không được lựa chọn sẽ được trả lại khi nào?", options: ["Khi gửi thư mời thương thảo", "Khi kết thúc giai đoạn đánh giá kỹ thuật", "Khi hoàn trả bảo đảm dự thầu của nhà thầu không được lựa chọn hoặc đăng tải kết quả lựa chọn nhà thầu", "Khi ký hợp đồng"], correctAnswer: 2 },
    { question: "Đối với đấu thầu quốc tế, hồ sơ mời thầu được phát hành như thế nào?", options: ["HSMT được phát hành trên Hệ thống mạng đấu thầu quốc gia: Nhà thầu nộp tiền mua bản điện tử hồ sơ mời thầu khi nộp hồ sơ dự thầu", "HSMT được bán vào giờ hành chính từ thứ 2 tới thứ 6 tại địa chỉ do Chủ đầu tư quy định", "Phương án A và B đều đúng", "Phương án A và B đều sai"], correctAnswer: 2 },
    { question: "Đối với gói thầu sử dụng vốn ngân sách nhà nước, tiền bán bản điện tử hồ sơ mời thầu, hồ sơ yêu cầu sẽ được xử lý như thế nào?", options: ["Sử dụng theo quy chế tài chính của chủ đầu tư", "Nộp vào ngân sách nhà nước theo quy định của Luật Ngân sách nhà nước", "Sử dụng theo cơ chế khoán chi", "Tất cả các đáp án trên đều sai"], correctAnswer: 1 },
    { question: "Chi phí đăng tải quyết định phê duyệt kế hoạch lựa chọn nhà thầu và quyết định phê duyệt kết quả lựa chọn nhà thầu lên Hệ thống mạng đấu thầu quốc gia đối với gói thầu chỉ định thầu là bao nhiêu?", options: ["220.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)", "330.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)", "Miễn phí", "110.000 đồng/1 gói thầu (đã bao gồm thuế giá trị gia tăng)"], correctAnswer: 0 },
    { question: "Thành viên tổ chuyên gia cần có tối thiểu bao nhiêu năm kinh nghiệm trong lĩnh vực liên quan?", options: ["01 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "02 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "03 năm công tác thuộc một trong các lĩnh vực liên quan đến nội dung pháp lý, kỹ thuật, tài chính của gói thầu", "Không có quy định về số năm kinh nghiệm"], correctAnswer: 2 },
    { question: "Bảo đảm cạnh tranh trong đấu thầu thuộc nội dung đánh giá về?", options: ["Tư cách hợp lệ", "Năng lực, kinh nghiệm", "Kỹ thuật", "Tài chính"], correctAnswer: 0 },
    { question: "Nhà thầu tham gia đấu thầu gói thầu hàng hóa phải độc lập với chủ thể nào sau đây?", options: ["Phải độc lập với nhà thầu tư vấn lập hồ sơ mời thầu gói thầu hàng hóa", "Phải độc lập với nhà thầu khác khi tham gia đấu thầu rộng rãi", "Phải độc lập với nhà thầu tư vấn lập kế hoạch tổng thể lựa chọn nhà thầu", "Phải độc lập với nhà thầu tư vấn lập kế hoạch lựa chọn nhà thầu"], correctAnswer: 0 },
    { question: "Nhận định nào sau đây không phù hợp với quy định về bảo đảm cạnh tranh trong đấu thầu?", options: ["Nhà thầu tham dự thầu phải độc lập với chủ đầu tư, trừ trường hợp: nhà thầu là đơn vị sự nghiệp công lập thuộc cơ quan quản lý nhà nước có chức năng, nhiệm vụ được giao phù hợp với tính chất gói thầu của cơ quan quản lý nhà nước đó; đơn vị sự nghiệp công lập và doanh nghiệp có cùng một cơ quan trực tiếp quản lý, góp vốn; các đơn vị sự nghiệp công lập có cùng một cơ quan trực tiếp quản lý", "Nhà thầu tham dự thầu phải độc lập với nhà thầu tư vấn quản lý dự án, tư vấn giám sát", "Nhà thầu tham dự thầu phải độc lập với nhà thầu tư vấn lập, thẩm tra, thẩm định hồ sơ thiết kế, dự toán", "Nhà thầu thực hiện hợp đồng phải độc lập với nhà thầu tư vấn lập kế hoạch lựa chọn nhà thầu."], correctAnswer: 3 },
    { question: "Nội dung nào sau đây không thuộc quy định về bảo đảm cạnh tranh trong đấu thầu khi nhà thầu tham dự thầu đấu thầu rộng rãi gói thầu EPC, EP, EC?", options: ["Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra thiết kế FEED", "Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra báo cáo nghiên cứu khả thi...", "Nhà thầu tham dự thầu phải độc lập với nhà thầu lập, thẩm tra báo cáo kinh tế kỹ thuật...", "Nhà thầu tham dự thầu phải độc lập với nhà thầu khác cùng tham dự đấu thầu rộng rãi"], correctAnswer: 3 },
    { question: "Nội dung nào là nội dung đánh giá tính hợp lệ của hồ sơ dự thầu?", options: ["Nhân sự chủ chốt", "Hiệu lực của hồ sơ dự thầu", "Năng lực tài chính", "Việc thực hiện nghĩa vụ kê khai thuế, nộp thuế"], correctAnswer: 1 },
    { question: "Nội dung nào không phải là tiêu chuẩn đánh giá về tính hợp lệ của hồ sơ dự thầu gói thầu tư vấn?", options: ["Hiệu lực của hồ sơ đề xuất về kỹ thuật đáp ứng yêu cầu theo quy định trong hồ sơ mời thầu", "Có bản gốc hồ sơ đề xuất về kỹ thuật", "Bảo đảm dự thầu hợp lệ", "Đã thực hiện nghĩa vụ kê khai thuế và nộp thuế"], correctAnswer: 3 },
    { question: "Đối với gói thầu mua sắm hàng hóa, xây lắp, phi tư vấn, phương pháp để đánh giá về năng lực và kinh nghiệm là:", options: ["Sử dụng tiêu chí đạt, không đạt", "Sử dụng phương pháp chấm điểm", "Kết hợp cả hai phương pháp tiêu chí đạt, không đạt và phương pháp chấm điểm", "Phương pháp dựa trên kỹ thuật"], correctAnswer: 0 },
    { question: "Tiêu chuẩn đánh giá năng lực kinh nghiệm đối với gói thầu mua sắm hàng hóa bao gồm?", options: ["Doanh thu bình quân 3 năm gần nhất", "Giấy phép bán hàng của nhà sản xuất", "Số năm thành lập của doanh nghiệp", "Năng lực quản lý của doanh nghiệp"], correctAnswer: 0 },
    { question: "Nội dung nào là tiêu chuẩn đánh giá về năng lực và kinh nghiệm không bắt buộc đối với gói thầu mua sắm hàng hóa?", options: ["Kinh nghiệm thực hiện hợp đồng cung cấp hàng hóa tương tự", "Giá trị tài sản ròng của nhà thầu", "Doanh thu của nhà thầu", "Việc thực hiện nghĩa vụ kê khai thuế và nộp thuế"], correctAnswer: 3 },
    { question: "Nội dung nào là tiêu chuẩn đánh giá về năng lực và kinh nghiệm bắt buộc đối với gói thầu xây lắp tổ chức đấu thầu rộng rãi không qua mạng?", options: ["Có bản gốc hồ sơ dự thầu", "Có tên trong danh sách ngắn", "Năng lực tài chính", "Có bảo đảm dự thầu hợp lệ"], correctAnswer: 2 },
    { question: "Tiêu chuẩn đánh giá về kỹ thuật được yêu cầu về nhãn hiệu theo nhóm nhãn hiệu cho nguyên nhiên vật liệu, vật tư và các yếu tố đầu vào đối với trường hợp nào?", options: ["Nội dung công việc xây lắp thuộc gói thầu xây lắp, gói thầu EC", "Nội dung công việc xây lắp thuộc gói thầu EPC", "Nội dung công việc xây lắp thuộc gói thầu EPC và gói thầu PC", "Nội dung công việc xây lắp thuộc gói thầu xây lắp và gói thầu PC"], correctAnswer: 1 },
    { question: "Nội dung nào không phải là tiêu chuẩn đánh giá về kỹ thuật của gói thầu tư vấn?", options: ["Uy tín của nhà thầu thông qua việc tham dự thầu, kết quả thực hiện hợp đồng của nhà thầu", "Đã thực hiện nghĩa vụ kê khai thuế và nộp thuế", "Uy tín của nhà thầu", "Kinh nghiệm và năng lực nhà thầu"], correctAnswer: 1 },
    { question: "Một trong các căn cứ lập hồ sơ mời thầu là:", options: ["Báo giá của nhà thầu", "Quyết định mua sắm được phê duyệt", "Kế hoạch lựa chọn nhà thầu được duyệt", "Phương án A và B đều đúng"], correctAnswer: 2 },
    { question: "Đối với gói thầu cung cấp dịch vụ tư vấn, phương pháp đánh giá nào không được áp dụng?", options: ["Giá thấp nhất", "Giá đánh giá", "Kết hợp giữa kỹ thuật và giá", "Giá cố định"], correctAnswer: 0 },
    { question: "Nội dung nào sau đây không thuộc hồ sơ mời thầu?", options: ["Chỉ dẫn nhà thầu, tùy chọn mua thêm", "Bảng dữ liệu đấu thầu", "Phạm vi cung cấp, yêu cầu về kỹ thuật", "Biên bản hoàn thiện hợp đồng"], correctAnswer: 3 },
    { question: "Trường hợp nào hồ sơ mời thầu được đưa ra yêu cầu về giấy phép bán hàng?", options: ["Hàng hóa thông thường, có sẵn trên thị trường", "Hàng hóa nhập khẩu", "Hàng hóa đặc thù, phức tạp cần gắn với trách nhiệm của nhà sản xuất", "Hàng hóa có giá trị lớn"], correctAnswer: 2 },
    { question: "Trong quá trình đánh giá hồ sơ dự thầu gói thầu áp dụng đấu thầu rộng rãi, chủ đầu tư phát hiện người đại diện theo pháp luật của 02 nhà thầu là anh em ruột được xem xét như thế nào?", options: ["Thuộc hành vi bị cấm trong đấu thầu", "Không đáp ứng yêu cầu về bảo đảm cạnh tranh trong đấu thầu", "Hồ sơ dự thầu của một trong hai nhà thầu không được xem xét", "Không thuộc hành vi bị cấm, không vi phạm quy định về bảo đảm cạnh tranh trong đấu thầu"], correctAnswer: 1 },
    { question: "Việc đánh giá nhà thầu đang trong thời gian bị cấm tham dự thầu thuộc nội dung đánh giá về:", options: ["Kỹ thuật", "Tài chính", "Tư cách hợp lệ", "Năng lực, kinh nghiệm"], correctAnswer: 2 },
    { question: "Khi đánh giá về năng lực kinh nghiệm đối với gói thầu mua sắm hàng hóa, nhà thầu được đánh giá là đạt khi:", options: ["Nhà thầu được đánh giá đạt tất cả tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng một trong các tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng hai phần ba các tiêu chuẩn đánh giá về năng lực và kinh nghiệm trong hồ sơ mời thầu", "Nhà thầu đáp ứng các tiêu chuẩn đánh giá về năng lực và kinh nghiệm quan trọng trong hồ sơ mời thầu"], correctAnswer: 0 },
    { question: "Hợp đồng theo tỷ lệ phần trăm có thể được áp dụng đối với gói thầu nào sau đây?", options: ["Mua sắm thiết bị y tế", "Xây dựng công trình", "Bảo hiểm công trình mà giá trị hợp đồng được xác định chính xác trên cơ sở giá trị công trình thực tế được nghiệm thu", "Tư vấn giám sát"], correctAnswer: 2 },
    { question: "Cơ sở để thanh toán hợp đồng cho nhà thầu là gì?", options: ["Giá hợp đồng và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng", "Dự toán gói thầu và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng", "Dự toán gói thầu", "Phương án A và C đều sai"], correctAnswer: 0 },
    { question: "Nhà thầu không được hoàn trả bảo đảm thực hiện hợp đồng trong trường hợp:", options: ["Từ chối thực hiện hợp đồng khi hợp đồng đã có hiệu lực", "Thực hiện hợp đồng chậm tiến độ nhưng vẫn hoàn thành hợp đồng", "Nhà thầu đề nghị điều chỉnh tiến độ do bất khả kháng", "Nhà thầu đề xuất thay đổi nhà thầu phụ"], correctAnswer: 0 },
    { question: "Trường hợp nào sau đây phải áp dụng bảo đảm thực hiện hợp đồng?", options: ["Nhà thầu cung cấp dịch vụ phi tư vấn", "Nhà thầu thực hiện gói thầu có giá gói thầu thuộc hạn mức chỉ định thầu", "Nhà thầu cung cấp dịch vụ tư vấn", "Nhà thầu được lựa chọn theo hình thức tự thực hiện"], correctAnswer: 0 },
    { question: "Hiện nay, Việt Nam đã mở cửa thị trường mua sắm chính phủ (đấu thầu) trong những hiệp định nào?", options: ["Chỉ Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP)", "Hiệp định CPTPP và Hiệp định thương mại tự do giữa Cộng hòa xã hội chủ nghĩa Việt Nam và Liên minh Châu Âu (EVFTA)", "Hiệp định CPTPP, Hiệp định EVFTA và Hiệp định Thương mại Tự do giữa Việt Nam và Liên hiệp Vương quốc Anh và Bắc Ireland (UKVFTA)", "Tất cả các hiệp định mà Việt Nam là thành viên"], correctAnswer: 2 },
    { question: "Số lượng các nước thành viên Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP) ký kết hiệp định ban đầu là bao nhiêu nước?", options: ["8", "9", "11 nước", "12 nước"], correctAnswer: 2 },
    { question: "Trong các hiệp định dưới đây, hiệp định nào không có quy định về các trường hợp chỉ định thầu?", options: ["Hiệp định Đối tác Toàn diện và Tiến bộ Xuyên Thái Bình Dương (CPTPP)", "Hiệp định thương mại tự do giữa Cộng hòa xã hội chủ nghĩa Việt Nam và Liên minh Châu Âu (EVFTA)", "Hiệp định EVFTA và Hiệp định Thương mại Tự do giữa Việt Nam và Liên hiệp Vương quốc Anh và Bắc Ireland (UKVFTA)", "Hiệp định Đối tác Kinh tế Toàn diện Khu vực (RCEP)"], correctAnswer: 3 },
    { question: "Hoạt động nào sau đây không thuộc phạm vi điều chỉnh của Nghị định số 95/2020/NĐ-CP?", options: ["Mua sắm thiết bị văn phòng", "Thuê dịch vụ tư vấn", "Thuê quyền sử dụng đất"], correctAnswer: 2 } 
         ]
    },
    exam2: {
  "title": "Đề 2",
  "description": "Đề bài gồm 50 câu, thời gian làm bài 100 phút!",
  "questions": [
    {
      "question": "Theo các hiệp định mà Việt Nam có mở cửa thị trường mua sắm chính phủ (đấu thầu), nhà thầu nước ngoài được tham gia đấu thầu tại Việt Nam trong:",
      "options": [
        "Tất cả các gói thầu",
        "Chỉ gói thầu ODA",
        "Gói thầu thuộc phạm vi điều chỉnh của hiệp định",
        "Gói thầu có giá trị lớn, phức tạp"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Theo quy định tại Nghị định số 95/2020/NĐ-CP, đấu thầu nội khối là:",
      "options": [
        "Đấu thầu mà chỉ có nhà thầu nội khối được tham dự",
        "Đấu thầu cho các dự án trong khối CPTPP",
        "Đấu thầu giữa các nước thành viên EVFTA, UKVFTA",
        "Đấu thầu trong nước"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Theo quy định tại Nghị định số 09/2022/NĐ-CP, cơ quan mua sắm phải tổ chức đấu thầu nội khối, trừ trường hợp nào?",
      "options": [
        "Không có nhà thầu trong nước tham gia",
        "Giá gói thầu quá lớn",
        "Người có thẩm quyền xét thấy cần tổ chức đấu thầu quốc tế để mang lại hiệu quả cao hơn cho dự án, gói thầu",
        "Hàng hóa thuộc gói thầu quá phức tạp mà nhà thầu trong nước không đáp ứng được"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Theo Thông tư số 21/2022/TT-BKHĐT, khi nào được đưa ra yêu cầu về nhân sự chủ chốt trong gói thầu dịch vụ phi tư vấn?",
      "options": [
        "Trong mọi trường hợp",
        "Khi giá gói thầu lớn",
        "Chỉ khi dịch vụ có yếu tố đặc thù, phức tạp cần thiết phải có nhân sự có hiểu biết, nhiều kinh nghiệm đảm nhận",
        "Khi có yêu cầu của nhà thầu"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Gói thầu mua thuốc là gói thầu nào?",
      "options": [
        "Gói thầu mua sắm hàng hóa",
        "Gói thầu cung cấp dịch vụ phi tư vấn",
        "Gói thầu hỗn hợp",
        "Gói thầu xây lắp"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đàm phán giá được áp dụng trong trường hợp nào sau đây?",
      "options": [
        "Mua thuốc chỉ có 01 hoặc 02 hãng sản xuất",
        "Mua thuốc, thiết bị y tế, vật tư xét nghiệm chỉ có 01 hãng sản xuất",
        "Mua hàng hóa chỉ có 01 hãng sản xuất",
        "Mua hàng hóa chỉ có 01 hoặc 02 hãng sản xuất"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Quy định về thời điểm bắt đầu và kết thúc chào giá trực tuyến theo quy trình rút gọn?",
      "options": [
        "Thời điểm bắt đầu và kết thúc phải trong giờ hành chính.",
        "Thời điểm bắt đầu không bắt buộc trong giờ hành chính nhưng kết thúc phải trong giờ hành chính.",
        "Thời điểm bắt đầu và kết thúc không bắt buộc trong giờ hành chính.",
        "Tất cả phương án trên đều sai"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Khi đánh giá E-HSDT gói thầu xây lắp đấu thầu rộng rãi qua mạng, trường hợp có sự không thống nhất giữa thông tin về hợp đồng tương tự kê khai trên webform và file tài liệu chứng minh các thông tin về hợp đồng đó thì xử lý:",
      "options": [
        "Đánh giá nhà thầu không đạt yêu cầu về hợp đồng tương tự",
        "Yêu cầu nhà thầu làm rõ E-HSDT trên Hệ thống mạng đấu thầu quốc gia",
        "Yêu cầu nhà thầu gửi bổ sung hợp đồng tương tự bằng bản giấy để đánh giá",
        "Các phương án trên đều sai"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Nhà thầu có trách nhiệm kê khai thông tin nào trên Hệ thống mạng đấu thầu quốc gia?",
      "options": [
        "Thông tin về uy tín của nhà thầu",
        "Thông tin về vi phạm của nhà thầu",
        "Thông tin về năng lực, kinh nghiệm",
        "Cả 3 phương án trên"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Nhận định nào sau đây đúng về văn bản điện tử trên Hệ thống mạng đấu thầu quốc gia?",
      "options": [
        "Văn bản điện tử trên Hệ thống có giá trị theo quy định của pháp luật về giao dịch điện tử, làm cơ sở đối chiếu, so sánh, xác thực thông tin phục vụ công tác đánh giá, thẩm định, thanh tra, kiểm tra, kiểm toán và giải ngân",
        "Thời điểm gửi, nhận văn bản điện tử được xác định căn cứ theo thời gian thực ghi lại trên Hệ thống",
        "Khi gửi hồ sơ thanh quyết toán đến Kho bạc Nhà nước, nhà thầu không phải cung cấp thông tin, tài liệu cho Kho bạc Nhà nước đối với các thông tin,tài liệu là văn bản điện tử trên Hệ thống",
        "Cả 3 phương án trên đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Ai chịu trách nhiệm đăng tải thông tin chủ yếu của hợp đồng trên Hệ thống mạng đấu thầu quốc gia?",
      "options": [
        "Bên mời thầu",
        "Tổ chuyên gia",
        "Tư vấn đấu thầu",
        "Chủ đầu tư"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Trong đấu thầu qua mạng, nhà thầu tư vấn đấu thầu bị khóa tài khoản trong vòng 06 tháng khi thực hiện hành vi nào sau đây?",
      "options": [
        "Tham gia vào quá trình lập và đánh giá E-HSMT",
        "Tham gia vào quá trình thẩm định hồ sơ mời thầu và kết quả lựa chọn nhà thầu",
        "Thay chủ đầu tư đăng tải các nội dung thuộc trách nhiệm đăng tải của chủ đầu tư",
        "Đăng tải thông tin về năng lực, kinh nghiệm của mình trên Hệ thống mạng đấu thầu quốc gia"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Chủ đầu tư có trách nhiệm đăng tải thông tin chủ yếu của hợp đồng trên Hệ thống đấu thầu quốc gia chậm nhất là:",
      "options": [
        "05 ngày làm việc kể từ ngày ký kết hợp đồng",
        "05 ngày làm việc kể từ ngày hợp đồng có hiệu lực",
        "05 ngày kể từ ngày hợp đồng có hiệu lực",
        "05 ngày làm việc kể từ ngày nhà thầu nộp bảo đảm thực hiện hợp đồng"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đối với đấu thầu qua mạng, việc trả lời yêu cầu làm rõ E-HSMT được thực hiện bởi:",
      "options": [
        "Do tổ chuyên gia thực hiện bằng văn bản",
        "Do tổ chuyên gia thực hiện trên Hệ thống mạng đấu thầu quốc gia",
        "Do tư vấn đấu thầu thực hiện bằng tài khoản của đơn vị tư vấn",
        "Do Chủ đầu tư thực hiện trên Hệ thống mạng đấu thầu quốc gia"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Danh sách nhà thầu có hành vi vi phạm và bị đánh giá về uy tín được đăng tải trên Hệ thống mạng đấu thầu quốc gia như thế nào?",
      "options": [
        "Tổ chuyên gia đăng tải trong thời hạn 03 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm",
        "Bên mời thầu đăng tải trong thời hạn 05 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm",
        "Chủ đầu tư đăng tải trong thời hạn 07 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm",
        "Người có thẩm quyền đăng tải trong thời hạn 05 ngày làm việc kể từ ngày nhà thầu có hành vi vi phạm"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Nhà thầu không phải đính kèm thư bảo lãnh (hoặc giấy chứng nhận bảo hiểm bảo lãnh) mà chỉ phải cam kết trong đơn dự thầu khi:",
      "options": [
        "E-HSMT yêu cầu giá trị bảo đảm dự thầu là 40 triệu đồng",
        "E-HSMT yêu cầu giá trị bảo đảm dự thầu là 50 triệu đồng",
        "E-HSMT yêu cầu giá trị bảo đảm dự thầu là 60 triệu đồng",
        "E-HSMT yêu cầu giá trị bảo đảm dự thầu là 100 triệu đồng"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Đối với đấu thầu qua mạng, việc làm rõ E-HSDT giữa Chủ đầu tư và nhà thầu có E-HSDT cần phải làm rõ được thực hiện như thế nào?",
      "options": [
        "Chủ đầu tư được làm rõ đối với các nội dung về tư cách hợp lệ, năng lực, kinh nghiệm, không được làm rõ đối với yêu cầu về kỹ thuật, tài chính",
        "Chủ đầu tư được làm rõ đối với yêu cầu về kỹ thuật, tài chính, không được làm rõ đối với các nội dung về tư cách hợp lệ, năng lực, kinh nghiệm",
        "Chủ đầu tư dành cho nhà thầu tối đa 03 ngày để nhà thầu thực hiện việc làm rõ E-HSDT",
        "Chủ đầu tư dành cho nhà thầu tối thiểu 03 ngày làm việc để nhà thầu thực hiện việc làm rõ E-HSDT"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Bản gốc thư bảo lãnh dự thầu, giấy chứng nhận bảo hiểm bảo lãnh trong đấu thầu qua mạng được nộp như thế nào?",
      "options": [
        "Gửi qua email đến Tổ trưởng Tổ chuyên gia",
        "Gửi cho Chủ đầu tư khi nhà thầu được mời vào đối chiếu tài liệu",
        "Gửi bản gốc đến địa chỉ bên mời thầu theo quy định trong E-HSMT",
        "Gửi cho Đơn vị tư vấn đấu thầu đánh giá E-HSDT"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với đấu thầu qua mạng, quy định nào về việc mở thầu và công khai biên bản mở thầu trên Hệ thống mạng đấu thầu quốc gia là đúng?",
      "options": [
        "Hệ thống tự động mở thầu và công khai biên bản mở thầu trong thời hạn không quá 02 giờ kể từ thời điểm đóng thầu.",
        "Chủ đầu tư phải mở thầu và công khai biên bản mở thầu trên Hệ thống trong thời hạn không quá 04 giờ kể từ thời điểm đóng thầu.",
        "Tổ chuyên gia phải mở thầu và công khai biên bản mở thầu trên Hệ thống trong thời hạn không quá 02 giờ kể từ thời điểm đóng thầu.",
        "Chủ đầu tư phải mở thầu và công khai biên bản mở thầu trên Hệ thống trong thời hạn không quá 02 giờ kể từ thời điểm đóng thầu."
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đối với gói thầu tổ chức lựa chọn nhà thầu qua mạng, trong quá trình đánh giá E-HSDT, Chủ đầu tư nhận thấy nhà thầu có tên trong biên bản mở thầu đang bị khóa tài khoản theo quy định của pháp luật về đấu thầu, E-HSDT của nhà thầu bị đánh giá như thế nào?",
      "options": [
        "E-HSDT của nhà thầu được tiếp tục xem xét, đánh giá mà không cần phải mở khóa tài khoản trước khi ký hợp đồng",
        "E-HSDT của nhà thầu được tiếp tục xem xét, đánh giá nhưng chỉ được đề nghị trúng thầu khi thực hiện mở khóa tài khoản trước khi ký hợp đồng",
        "E-HSDT của nhà thầu không được tiếp tục xem xét, đánh giá",
        "Nhà thầu bị cấm tham gia hoạt động đấu thầu do có hành vi gian lận"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với đấu thầu qua mạng, sau thời điểm đóng thầu, nhận định nào sau đây là đúng?",
      "options": [
        "Nhà thầu có thể thay đổi nội dung E-HSDT nếu phát hiện sai sót",
        "Nhà thầu có thể làm rõ E-HSDT trên Hệ thống",
        "Nhà thầu được rút E-HSDT trên Hệ thống",
        "Chủ đầu tư không được phép mở thầu khi chỉ có 01 nhà thầu tham dự"
      ],
      "correctAnswer": 1
    },
    {
      "question": "File đính kèm nào sau đây của nhà thầu nộp trên Hệ thống mạng đấu thầu quốc gia không được xem xét, đánh giá?",
      "options": [
        "Các file mở, đọc được bằng các phần mềm thông dụng...",
        "Các file sử dụng phông chữ thuộc bảng mã Unicode",
        "Các file nén mở được bằng các phần mềm giải nén thông dụng...",
        "Các file bị nhiễm virus, bị lỗi, hỏng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Đối với đấu thầu qua mạng, nội dung nào sau đây do Hệ thống tự động đánh giá?",
      "options": [
        "Bảo đảm dự thầu",
        "Thỏa thuận liên danh đối với nhà thầu liên danh",
        "Doanh thu bình quân 3 năm gần nhất của nhà thầu",
        "Các đáp án trên đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Đối với đấu thầu qua mạng, nội dung đánh giá kết quả hoạt động tài chính nào sau đây là đúng?",
      "options": [
        "Đối với số liệu về kết quả hoạt động tài chính từ 2021 trở đi, Hệ thống đánh giá căn cứ thông tin được trích xuất hoặc thông tin do nhà thầu cập nhật",
        "Đối với số liệu về kết quả hoạt động tài chính trước năm 2021, hệ thống đánh giá căn cứ thông tin do nhà thầu kê khai",
        "Đối với nhà thầu là hộ kinh doanh, không đánh giá tiêu chí kết quả hoạt động tài chính",
        "Tất cả phương án trên đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Đối với đấu thầu rộng rãi qua mạng, một số nội dung do Hệ thống mạng đấu thầu quốc gia đánh giá \"không đạt\" thì Tổ chuyên gia không thể sửa đổi kết quả đánh giá từ \"không đạt\" thành \"đạt\". Phương án nào sau đây là đúng?",
      "options": [
        "Tư cách hợp lệ, nhà thầu không có nhân sự bị tòa án kết án có hành vi vi phạm quy định về đấu thầu gây hậu quả nghiêm trọng, trạng thái bị tạm ngừng, chấm dứt tham gia Hệ thống mạng đấu thầu quốc gia, doanh thu bình quân hằng năm.",
        "Tư cách hợp lệ, bảo đảm dự thầu, thực hiện nghĩa vụ kê khai thuế và nộp thuế, kết quả hoạt động tài chính, doanh thu bình quân hàng năm",
        "Tư cách hợp lệ, nhà thầu không có nhân sự bị tòa án kết án có hành vi vi phạm quy định về đấu thầu gây hậu quả nghiêm trọng, trạng thái bị tạm ngừng, chấm dứt tham gia Hệ thống mạng đấu thầu quốc gia, thực hiện nghĩa vụ kê khai thuế và nộp thuế, kết quả hoạt động tài chính, doanh thu bình quân hàng năm",
        "Tư cách hợp lệ, nhà thầu không có nhân sự bị tòa án kết án có hành vi vi phạm quy định về đấu thầu gây hậu quả nghiêm trọng, lịch sử không hoàn thành hợp đồng do lỗi của nhà thầu, thực hiện nghĩa vụ kê khai thuế và nộp thuế, kết quả hoạt động tài chính, doanh thu bình quân hàng năm"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với đấu thầu qua mạng, trường hợp Hệ thống gặp sự cố thì trường hợp nào được Hệ thống tự động gia hạn thời điểm đóng thầu?",
      "options": [
        "Các gói thầu có thời điểm đóng thầu, thời điểm kết thúc chào giá trực tuyến trong thời gian từ khi Hệ thống gặp sự cố cho đến thời điểm sau hoàn thành khắc phục sự cố 02 giờ",
        "Các gói thầu có thời điểm đóng thầu, thời điểm kết thúc chào giá trực tuyến, thời điểm đăng tải kết quả lựa chọn nhà thầu trong thời gian từ khi Hệ thống gặp sự cố cho đến thời điểm sau hoàn thành khắc phục sự cố 02 giờ",
        "Các gói thầu có thời điểm đóng thầu trong thời gian từ khi Hệ thống gặp sự cố cho đến thời điểm sau hoàn thành khắc phục sự cố 04 giờ",
        "Các đáp án trên đều sai"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đối với đấu thầu qua mạng, khi tham dự thầu, nhà thầu...?",
      "options": [
        "Chịu trách nhiệm về tính chính xác của các thông tin kê khai trên webform và file tài liệu đính kèm",
        "Chỉ nộp một bộ E-HSDT đối với một E-TBMT",
        "Chỉ được rút, sửa đổi, nộp lại E-HSDT trước thời điểm đóng thầu",
        "Cả 3 đáp án trên đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Khi nào nhà thầu phải nộp lại E-HSDT đã nộp?",
      "options": [
        "Khi Tổ chuyên gia phát hiện E-HSDT bị lỗi kỹ thuật không mở được",
        "Khi Hệ thống mạng đấu thầu quốc gia gặp sự cố phải tự động gia hạn",
        "Khi E-HSMT được sửa đổi",
        "Các phương án trên đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Quy trình 02 trong đánh giá E-HSDT được áp dụng đối với gói thầu nào sau đây?",
      "options": [
        "Gói thầu mua sắm hàng hóa áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp \"giá thấp nhất\" và các nhà thầu, E-HSDT đều không có bất kỳ ưu đãi nào",
        "Gói thầu dịch vụ phi tư vấn áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp \"giá đánh giá\" và các nhà thầu, E-HSDT chào ưu đãi như nhau",
        "Gói thầu xây lắp áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp \"giá thấp nhất\" và các nhà thầu, E-HSDT đều không có bất kỳ ưu đãi nào",
        "Gói thầu máy đặt, máy mượn áp dụng phương thức một giai đoạn một túi hồ sơ, sử dụng phương pháp \"giá thấp nhất\" và các nhà thầu, E-HSDT chào ưu đãi như nhau"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với gói thầu tổ chức đấu thầu rộng rãi qua mạng, trường hợp tại thời điểm đóng thầu mà không có nhà thầu nộp E-HSDT thì chủ đầu tư quyết định theo phương án nào sau đây?",
      "options": [
        "Hủy E-TBMT",
        "Chuyển sang hình thức đấu thầu rộng rãi không qua mạng",
        "Cho phép gia hạn thời điểm đóng thầu tối thiểu 05 ngày đối với gói thầu xây lắp, hỗn hợp có giá gói thầu không quá 20 tỷ đồng, gói thầu mua sắm hàng hoá, dịch vụ phi tư vấn có giá không quá 10 tỷ đồng",
        "Phương án A và C đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Chủ thể nào sau đây được gia hạn thời điểm đóng thầu trên Hệ thống mạng đấu thầu quốc gia?",
      "options": [
        "Người có thẩm quyền",
        "Chủ đầu tư",
        "Tổ chuyên gia",
        "Tư vấn đấu thầu"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Chọn phương án đúng về thời gian áp dụng mua sắm trực tuyến đối với các hạng mục trong danh mục hàng hóa, dịch vụ mua sắm tập trung?",
      "options": [
        "Thời gian áp dụng là thời gian thực hiện hợp đồng trong trường hợp không ký thỏa thuận khung nhưng không quá 24 tháng kể từ ngày hợp đồng có hiệu lực hoặc thời gian có hiệu lực của thỏa thuận khung",
        "Thời gian áp dụng là 24 tháng kể từ ngày kết quả lựa chọn nhà thầu được đăng tải trên Hệ thống mạng đấu thầu quốc gia trong trường hợp hợp đồng, thỏa thuận khung chưa được công khai",
        "Thời gian áp dụng là 24 tháng kể từ ngày kết quả lựa chọn nhà thầu được đăng tải trên Hệ thống mạng đấu thầu quốc gia",
        "Phương án A và B đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Đối với gói thầu đấu thầu qua mạng, trường hợp sửa đổi E-HSMT sau khi phát hành, chủ đầu tư phải đăng tải tài liệu nào sau đây trên Hệ thống?",
      "options": [
        "Quyết định sửa đổi kèm theo những nội dung sửa đổi E-HSMT",
        "E-HSMT đã được sửa đổi",
        "Báo cáo thẩm định E-HSMT sửa đổi",
        "Phương án A và B đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Đối với gói thầu chào giá trực tuyến rút gọn, nhà thầu xác nhận về việc chấp thuận được trao hợp đồng trong thời gian tối đa bao lâu kể từ ngày chủ đầu tư mời nhà thầu xác nhận trên Hệ thống mạng đấu thầu quốc gia?",
      "options": [
        "03 ngày",
        "03 ngày làm việc",
        "05 ngày",
        "05 ngày làm việc"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Gói thầu chào giá trực tuyến rút gọn, trường hợp nhà thầu từ chối hoặc không xác nhận về việc chấp thuận được trao hợp đồng trên Hệ thống mạng đấu thầu quốc gia thì nội dung nào sau đây không đúng?",
      "options": [
        "Công khai tên nhà thầu trên Hệ thống mạng đấu thầu quốc gia",
        "Khóa chức năng chào giá trực tuyến trong thời hạn 06 tháng kể từ ngày chủ đầu tư công khai tên nhà thầu trên Hệ thống mạng đấu thầu quốc gia",
        "Khóa tài khoản trong thời hạn 03 tháng kể từ ngày Bộ Tài chính nhận được văn bản đề nghị của chủ đầu tư",
        "Bị đánh giá về uy tín trong việc tham dự thầu"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Mua sắm trực tuyến được áp dụng đối với hàng hoá, dịch vụ của gói thầu thuộc dự toán mua sắm với giá gói thầu có hạn mức tối đa là bao nhiêu?",
      "options": [
        "100 triệu đồng",
        "300 triệu đồng",
        "500 triệu đồng",
        "01 tỷ đồng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Chào giá trực tuyến theo quy trình thông thường áp dụng đối với gói thầu nào sau đây?",
      "options": [
        "Dịch vụ phi tư vấn thông dụng, đơn giản",
        "Xây lắp",
        "Dịch vụ tư vấn",
        "Hỗn hợp"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Nhà thầu phải thực hiện xác nhận về việc chấp thuận được trao hợp đồng trên Hệ thống mạng đấu thầu quốc gia đối với các hình thức lựa chọn nhà thầu qua mạng nào?",
      "options": [
        "Đấu thầu rộng rãi, chào hàng cạnh tranh, đấu thầu hạn chế",
        "Chào giá trực tuyến theo quy trình thông thường",
        "Chào giá trực tuyến theo quy trình rút gọn",
        "Các phương án trên đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Công việc nào sau đây phải thực hiện trên Hệ thống mạng đấu thầu quốc gia?",
      "options": [
        "Lập E-HSMT",
        "Trình phê duyệt E-HSMT, phê duyệt E-HSMT",
        "Phê duyệt kết quả lựa chọn nhà thầu",
        "Tất cả các phương án trên đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Chủ đầu tư yêu cầu gia hạn hiệu lực hồ sơ dự thầu, bảo đảm dự thầu trong trường hợp nào sau đây?",
      "options": [
        "Trước khi hết hạn hiệu lực hồ sơ dự thầu",
        "Trường hợp hồ sơ dự thầu của nhà thầu xếp hạng tiếp theo hết hiệu lực thì Chủ đầu tư phải yêu cầu nhà thầu gia hạn hiệu lực của hồ sơ dự thầu, bảo đảm dự thầu trước khi thương thảo hợp đồng",
        "Trước khi có kết quả lựa chọn nhà thầu",
        "Phương án A và B đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Tài khoản nghiệp vụ trên Hệ thống mạng đấu thầu quốc gia là gì?",
      "options": [
        "Tài khoản do người sử dụng đăng ký và được phê duyệt trên Hệ thống mạng đấu thầu quốc gia",
        "Tài khoản do Trung tâm Đấu thầu qua mạng quốc gia cấp phép theo quy định",
        "Tài khoản do Tài khoản tham gia hệ thống tạo ra",
        "Phương án A và B đều đúng"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Trong mua sắm tập trung, hợp đồng điện tử có thể được ký kết giữa các đối tượng nào?",
      "options": [
        "Đơn vị mua sắm tập trung và nhà thầu trúng thầu (trong trường hợp không ký thỏa thuận khung)",
        "Đơn vị mua sắm tập trung và các đơn vị có nhu cầu",
        "Đơn vị mua sắm tập trung với các nhà thầu trúng thầu",
        "Phương án A và B đều sai"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Trong quá trình đánh giá, Tổ chuyên gia phát hiện nhà thầu tham dự thầu trên Hệ thống mạng đấu thầu quốc gia đính kèm tệp tin có thiết lập mật khẩu thì xử lý thế nào?",
      "options": [
        "Yêu cầu nhà thầu nộp lại tệp tin không có thiết lập mật khẩu trên Hệ thống mạng đấu thầu quốc gia để xem xét, đánh giá",
        "Yêu cầu nhà thầu cung cấp mật khẩu để xem xét, đánh giá",
        "Tệp tin này không được xem xét, đánh giá",
        "Phương án A và B đều đúng"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với chào giá trực tuyến rút gọn, kể từ lượt chào giá thứ hai, giá chào của nhà thầu không được thấp hơn giá thấp nhất hiển thị trên Hệ thống mạng đấu thầu quốc gia là bao nhiêu %?",
      "options": [
        "80%",
        "85%",
        "90%",
        "95%"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với chào giá trực tuyến rút gọn, giá trị bảo đảm dự thầu tối đa là giá trị nào sau đây?",
      "options": [
        "5% giá gói thầu",
        "10% giá gói thầu",
        "1,5% giá gói thầu",
        "Không yêu cầu về bảo đảm dự thầu"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Đối với gói thầu áp dụng chào giá trực tuyến theo quy trình thông thường, trường hợp nhà thầu được mời tham gia chào giá trực tuyến nhưng nhà thầu từ chối thì xử lý thế nào?",
      "options": [
        "Đề xuất về tài chính của nhà thầu sẽ bị đánh giá là không đạt",
        "Nhà thầu sẽ bị loại và bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong vòng 06 tháng",
        "Hồ sơ dự thầu của nhà thầu sẽ tiếp tục được đánh giá về tài chính căn cứ theo hồ sơ dự thầu đã nộp trước thời điểm đóng thầu",
        "Phương án A và B đều đúng"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với việc giải quyết kiến nghị về các vấn đề trước khi có thông báo kết quả lựa chọn nhà thầu, cá nhân, đơn vị nào sau đây có trách nhiệm giải quyết kiến nghị?",
      "options": [
        "Chủ đầu tư, người có thẩm quyền",
        "Chủ đầu tư, Hội đồng giải quyết kiến nghị",
        "Người có thẩm quyền, Hội đồng giải quyết kiến nghị",
        "Chủ đầu tư, tổ chuyên gia"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đối với việc giải quyết kiến nghị về kết quả lựa chọn nhà thầu, cá nhân, đơn vị nào sau đây có trách nhiệm giải quyết kiến nghị?",
      "options": [
        "Chủ đầu tư, người có thẩm quyền",
        "Chủ đầu tư, Hội đồng giải quyết kiến nghị",
        "Người có thẩm quyền, Hội đồng giải quyết kiến nghị",
        "Chủ đầu tư, tổ chuyên gia"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Trường hợp đang trong quá trình giải quyết kiến nghị mà nhà thầu gửi đơn khiếu nại thì việc giải quyết kiến nghị được xử lý thế nào?",
      "options": [
        "Tiếp tục giải quyết kiến nghị",
        "Chấm dứt ngay việc giải quyết kiến nghị",
        "Tạm dừng việc giải quyết kiến nghị đến khi có kết quả giải quyết khiếu nại",
        "Tất cả phương án trên đều sai"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Đơn vị sự nghiệp công lập (tự chủ chi thường xuyên và chi đầu tư) thuộc tỉnh B tổ chức đấu thầu cho dự án sử dụng vốn ngân sách nhà nước thì Giám đốc Sở Tài chính Tỉnh B có trách nhiệm thành lập Hội đồng giải quyết kiến nghị cho gói thầu có kiến nghị tại Dự án này hay không?",
      "options": [
        "Có trách nhiệm thành lập",
        "Không có trách nhiệm thành lập",
        "Thành lập khi chủ tịch UBND tỉnh yêu cầu",
        "Thành lập khi Giám đốc doanh nghiệp A đề nghị"
      ],
      "correctAnswer": 1
    }
  ]
},
        
    Exam3: {
  "title": "Đề 3",
  "description": "Đề bài gồm 50 câu, thời gian làm bài 100 phút!",
  "questions": [
    {
      "question": "Chi phí giải quyết kiến nghị được nhà thầu nộp cho chủ thể nào sau đây?",
      "options": [
        "Chủ tịch Hội đồng tư vấn giải quyết kiến nghị",
        "Bộ phận thường trực giúp việc cho Chủ tịch Hội đồng giải quyết kiến nghị",
        "Chủ đầu tư",
        "Người có thẩm quyền"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Đối với kiến nghị về kết quả lựa chọn nhà thầu, Hội đồng giải quyết kiến nghị phải có văn bản giải quyết kiến nghị trong thời hạn bao nhiêu ngày kể từ ngày Hội đồng được thành lập?",
      "options": [
        "25 ngày",
        "30 ngày",
        "35 ngày",
        "20 ngày"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Các trường hợp nào sau đây nhà thầu không được hoàn trả chi phí giải quyết kiến nghị?",
      "options": [
        "Kiến nghị của nhà thầu được kết luận là đúng",
        "Một hoặc các nội dung kiến nghị của nhà thầu được kết luận là không đúng",
        "Nhà thầu rút đơn kiến nghị trong quá trình giải quyết kiến nghị",
        "Phương án B và C đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Phương án nào sau đây là đúng trong việc giải quyết kiến nghị đối với gói thầu sử dụng vốn sản xuất kinh doanh của doanh nghiệp nhà nước?",
      "options": [
        "Hội đồng giải quyết kiến nghị do Sở Tài chính thành lập có trách nhiệm giải quyết kiến nghị cho gói thầu",
        "Hội đồng giải quyết kiến nghị do Bộ trưởng Bộ Tài chính thành lập có trách nhiệm giải quyết kiến nghị cho gói thầu",
        "Người đứng đầu doanh nghiệp nhà nước tự ban hành điều kiện, quy trình về giải quyết kiến nghị trong đơn vị mình",
        "Tất cả phương án A,B,C đều sai"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Hội đồng giải quyết kiến nghị có quyền thực hiện việc nào sau đây?",
      "options": [
        "Hủy kết quả lựa chọn nhà thầu",
        "Yêu cầu chủ đầu tư tạm dừng, ký kết hợp đồng",
        "Yêu cầu nhà thầu, chủ đầu tư và các cơ quan liên quan cung cấp thông tin của gói thầu, dự án và các thông tin liên quan khác để thực hiện nhiệm vụ",
        "Không công nhận kết quả lựa chọn nhà thầu"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Trường hợp hồ sơ mời thầu cho phép nhà thầu đề xuất biện pháp thi công khác với biện pháp thi công nêu trong hồ sơ mời thầu thì phần sai khác giữa khối lượng công việc theo biện pháp thi công nêu trong hồ sơ mời thầu và khối lượng công việc theo biện pháp thi công do nhà thầu đề xuất được xem xét thế nào?",
      "options": [
        "Được tính là sai lệch thừa",
        "Không được tính là sai lệch thừa",
        "Được tính là sai lệch thiếu",
        "Không bị tính là sai lệch thiếu"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Trường hợp hồ sơ dự thầu có giá dự thầu sau sửa lỗi, hiệu chỉnh sai lệch, trừ đi giá trị giảm giá (nếu có) thấp khác thường thì chủ đầu tư có thể quy định giá trị bảo đảm thực hiện hợp đồng tối đa là bao nhiêu để đề phòng rủi ro?",
      "options": [
        "30% giá hợp đồng",
        "35% giá hợp đồng",
        "40% giá hợp đồng",
        "45% giá hợp đồng"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đối với gói thầu chia phần, chủ đầu tư có thể phê duyệt kết quả lựa chọn nhà thầu cho một phần của gói thầu hay không?",
      "options": [
        "Không thể",
        "Có thể nhưng phải bảo đảm điều kiện giá đề nghị trúng thầu không vượt giá gói thầu",
        "Có thể nhưng phải bảo đảm tỷ lệ tiết kiệm tối thiểu 5%",
        "Có thể nhưng phải bảo đảm điều kiện giá đề nghị trúng thầu không vượt giá của phần đó trong giá gói thầu"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Đối với gói thầu chia phần, trường hợp một phần của gói thầu không có nhà thầu tham dự thầu thì chủ đầu tư xử lý thế nào?",
      "options": [
        "Tách phần đó ra thành gói thầu riêng biệt để tổ chức lựa chọn nhà thầu theo quy định",
        "Hủy thầu",
        "Đàm phán với nhà thầu trúng thầu của phần khác để thực hiện",
        "Phương án B và C đều đúng"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đối với kiến nghị về các vấn đề trước khi có thông báo kết quả lựa chọn nhà thầu, trường hợp nhà thầu gửi đơn kiến nghị đồng thời đến người có thẩm quyền và chủ đầu tư thì chủ thể nào có trách nhiệm giải quyết kiến nghị?",
      "options": [
        "Người có thẩm quyền",
        "Chủ đầu tư",
        "Bộ phận thường trực",
        "Hội đồng giải quyết kiến nghị"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Đối với kiến nghị về kết quả lựa chọn nhà thầu, trường hợp nhà thầu gửi đơn kiến nghị đồng thời đến bộ phận thường trực và chủ đầu tư thì chủ thể nào có trách nhiệm giải quyết kiến nghị?",
      "options": [
        "Người có thẩm quyền",
        "Chủ đầu tư",
        "Bộ phận thường trực",
        "Hội đồng giải quyết kiến nghị"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Nội dung nào không thuộc nội dung quản lý nhà nước đối với hoạt động đấu thầu?",
      "options": [
        "Quản lý hệ thống thông tin và cơ sở dữ liệu về đấu thầu trên phạm vi cả nước",
        "Lập hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu, hồ sơ yêu cầu",
        "Đào tạo, bồi dưỡng kiến thức, nghiệp vụ chuyên môn về đấu thầu.",
        "Hợp tác quốc tế về đấu thầu"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Theo quy định pháp luật về đấu thầu, kiểm tra hoạt động đấu thầu được tiến hành theo hình thức nào?",
      "options": [
        "Kiểm tra trực tiếp",
        "Báo cáo bằng văn bản",
        "Kết hợp giữa kiểm tra trực tiếp và báo cáo bằng văn bản",
        "Kiểm tra định kỳ hoặc đột xuất"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Thời hiệu áp dụng biện pháp cấm tham gia hoạt động đấu thầu là bao lâu?",
      "options": [
        "10 năm tính từ ngày xảy ra hành vi vi phạm",
        "10 năm tính từ ngày phát hiện ra hành vi vi phạm",
        "05 năm tính từ ngày phát hiện ra hành vi vi phạm",
        "05 năm tính từ ngày xảy ra hành vi vi phạm"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Chủ thể nào không có quyền cấm tham gia hoạt động đấu thầu?",
      "options": [
        "Người có thẩm quyền",
        "Chủ đầu tư",
        "Bộ trưởng, Thủ trưởng cơ quan ngang Bộ, cơ quan thuộc Chính phủ, cơ quan khác ở Trung ương",
        "Chủ tịch Ủy ban nhân dân cấp tỉnh"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Người có thẩm quyền ban hành quyết định cấm tham gia hoạt động đấu thầu với thời gian cấm bao lâu đối với trường hợp tổ chức, cá nhân có từ 02 hành vi vi phạm trở lên thuộc cùng phạm vi quản lý của người có thẩm quyền và các hành vi này chưa bị cấm tham gia hoạt động đấu thầu?",
      "options": [
        "Bằng tổng thời gian cấm của các hành vi vi phạm nhưng tối thiểu trên 05 năm",
        "Bằng tổng thời gian cấm của các hành vi vi phạm nhưng tối đa không quá 03 năm",
        "Bằng tổng thời gian cấm của các hành vi vi phạm nhưng tối đa không quá 05 năm",
        "Bằng thời gian cấm của hành vi vi phạm có thời gian bị cấm cao nhất"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Hành vi gian lận trong hoạt động đấu thầu sẽ bị cấm tham gia hoạt động đấu thầu trong thời gian bao lâu?",
      "options": [
        "Từ 06 tháng đến 01 năm",
        "02 năm",
        "Từ 01 năm đến 02 năm",
        "Từ 03 năm đến 05 năm"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Hành vi cản trở trong hoạt động đấu thầu sẽ bị cấm tham gia hoạt động đấu thầu trong thời gian bao lâu?",
      "options": [
        "06 tháng",
        "Từ 06 tháng đến dưới 01 năm",
        "Từ 01 năm đến 03 năm",
        "05 năm"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Thành viên A trong nhà thầu liên danh A-B thực hiện hành vi \"làm giả hoặc làm sai lệch thông tin, hồ sơ, tài liệu trong đấu thầu\" thì việc cấm tham gia hoạt động đấu thầu được xử lý như thế nào?",
      "options": [
        "Cấm tham gia hoạt động đấu thầu từ 03 năm đến 05 năm đối với thành viên A",
        "Cấm tham gia hoạt động đấu thầu từ 01 năm đến dưới 03 năm đối với thành viên A",
        "Cấm tham gia hoạt động đấu thầu từ 03 năm đến 05 năm đối với tất cả thành viên trong nhà thầu liên danh A-B",
        "Cấm tham gia hoạt động đấu thầu từ 01 năm đến 03 năm đối với tất cả thành viên trong nhà thầu liên danh A-B"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Thẩm quyền xử lý tình huống phát sinh trong đấu thầu?",
      "options": [
        "Chủ đầu tư quyết định xử lý tình huống sau khi có ý kiến của người có thẩm quyền",
        "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của Tổ chuyên gia",
        "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của chủ đầu tư",
        "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của chủ đầu tư và Tổ chuyên gia"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Trường hợp một hoặc một số thành viên liên danh vi phạm hợp đồng, không còn năng lực để tiếp tục thực hiện hợp đồng, làm ảnh hưởng nghiêm trọng đến tiến độ, chất lượng, hiệu quả của gói thầu thì việc đánh giá uy tín của nhà thầu trong việc thực hiện hợp đồng được xử lý như nào?",
      "options": [
        "Nhà thầu liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị chủ đầu tư đăng tải thông tin nhà thầu liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia",
        "Chỉ một hoặc một số thành viên liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị chủ đầu tư đăng tải thông tin thành viên liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia",
        "Chỉ một hoặc một số thành viên liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị bên mời thầu đăng tải thông tin thành viên liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia",
        "Nhà thầu liên danh vi phạm hợp đồng bị coi là không hoàn thành hợp đồng và bị bên mời thầu đăng tải thông tin nhà thầu liên danh vi phạm hợp đồng trên Hệ thống mạng đấu thầu quốc gia"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Trường hợp phải chấm dứt hợp đồng với nhà thầu vi phạm hợp đồng để thay thế nhà thầu mới thì phần công việc chưa thực hiện được áp dụng hình thức chỉ định thầu cho nhà thầu khác với giá trị được tính như nào?",
      "options": [
        "Bằng giá trị ghi trong hợp đồng trừ đi giá trị của phần công việc đã thực hiện, được nghiệm thu trước đó",
        "Bằng giá trị ghi trong hợp đồng được cập nhật giá tại thời điểm áp dụng hình thức chỉ định thầu trừ đi giá trị của phần công việc đã thực hiện, được nghiệm thu trước đó",
        "Bằng giá trị của phần công việc còn lại được cập nhật giá tại thời điểm áp dụng hình thức chỉ định thầu",
        "Bằng giá trị ghi trong hợp đồng trừ đi giá trị của phần công việc đã thực hiện trước đó theo dự toán được duyệt"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đối với nhà thầu liên danh, trường hợp trong quá trình thực hiện hợp đồng cần đẩy nhanh tiến độ thực hiện so với hợp đồng đã ký (cần sửa đổi hợp đồng) thì cần thực hiện như thế nào?",
      "options": [
        "Các thành viên liên danh thỏa thuận, điều chỉnh về phạm vi công việc, tiến độ được rút ngắn và không phải thông báo cho chủ đầu tư",
        "Các thành viên liên danh thỏa thuận, điều chỉnh về phạm vi công việc, tiến độ được rút ngắn và thông báo cho chủ đầu tư",
        "Phải được người có thẩm quyền cho phép chủ đầu tư và nhà thầu thỏa thuận, điều chỉnh phạm vi công việc giữa các thành viên liên danh phù hợp với tiến độ hoặc tiến độ được rút ngắn",
        "Chủ đầu tư và nhà thầu được thỏa thuận điều chỉnh phạm vi công việc giữa các thành viên liên danh phù hợp với tiến độ hoặc tiến độ được rút ngắn"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Trường hợp nhà thầu có nhân sự (ký kết hợp đồng lao động với nhà thầu tại thời điểm nhân sự thực hiện hành vi vi phạm) bị cơ quan điều tra kết luận có hành vi vi phạm quy định về đấu thầu gây hậu quả nghiêm trọng theo quy định pháp luật về hình sự nhằm mục đích cho nhà thầu trúng thầu nhưng nhân sự của nhà thầu chưa bị Tòa án kết án hoặc nhà thầu chưa bị người có thẩm quyền ra quyết định cấm tham gia hoạt động đấu thầu thì tại thời điểm này nhà thầu có được tham dự thầu hay không?",
      "options": [
        "Nhà thầu không được tham dự thầu",
        "Hồ sơ dự thầu, hồ sơ đề xuất của nhà thầu sẽ được mở nhưng không được xem xét, đánh giá",
        "Hồ sơ dự thầu, hồ sơ đề xuất của nhà thầu không được mở thầu và trả lại theo nguyên trạng",
        "Nhà thầu vẫn được tiếp tục tham dự thầu"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Trường hợp nào là một trong những điều kiện để chủ đầu tư chấp thuận đề xuất của nhà thầu trong quá trình thực hiện hợp đồng về việc thay đổi các hàng hóa có phiên bản sản xuất, năm sản xuất mới hơn so với hàng hóa ghi trong hợp đồng?",
      "options": [
        "Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số và các yêu cầu kỹ thuật khác tương đương hoặc tốt hơn hàng hóa ghi trong hợp đồng nhưng bắt buộc phải cùng hãng sản xuất và xuất xứ",
        "Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số và các yêu cầu kỹ thuật khác tương đương hoặc tốt hơn hàng hóa ghi trong hợp đồng, phải cùng hãng sản xuất nhưng không bắt buộc cùng xuất xứ",
        "Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số và các yêu cầu kỹ thuật khác tương đương hoặc tốt hơn hàng hóa ghi trong hợp đồng, phải cùng xuất xứ nhưng không bắt buộc cùng hãng sản xuất",
        "Hàng hóa thay thế có tính năng kỹ thuật, cấu hình, thông số và các yêu cầu kỹ thuật khác tương đương hoặc tốt hơn hàng hóa ghi trong hợp đồng nhưng không bắt buộc cùng hãng sản xuất và cùng xuất xứ"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Trường hợp gói thầu có tính chất đặc thù và áp dụng hình thức chỉ định thầu hoặc lựa chọn nhà thầu trong trường hợp đặc biệt, nhà thầu nước ngoài có yêu cầu ràng buộc chỉ ký hợp đồng khi không phải đăng ký trên Hệ thống mạng đấu thầu quốc gia thì chủ đầu tư xử lý như thế nào?",
      "options": [
        "Không cần yêu cầu nhà thầu nước ngoài đăng ký khi đăng tải kết quả lựa chọn nhà thầu",
        "Yêu cầu nhà thầu nước ngoài đăng ký khi đăng tải kết quả lựa chọn nhà thầu",
        "Nhà thầu không được chấp nhận và bị loại",
        "Hủy thầu"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Đối với trường hợp hủy thầu thì phải thực hiện giải pháp nào sau đây?",
      "options": [
        "Phải điều chỉnh thời gian bắt đầu tổ chức lựa chọn nhà thầu trong kế hoạch lựa chọn nhà thầu",
        "Phải điều chỉnh thời gian thực hiện gói thầu trong kế hoạch lựa chọn nhà thầu",
        "Không phải điều chỉnh thời gian bắt đầu tổ chức lựa chọn nhà thầu trong kế hoạch lựa chọn nhà thầu",
        "Tất cả các đáp án trên đều không đúng"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Hủy thầu được thực hiện trong thời gian nào?",
      "options": [
        "Từ ngày có thời điểm đóng thầu đến khi có kết quả lựa chọn nhà thầu",
        "Từ ngày phát hành hồ sơ mời sơ tuyển, hồ sơ mời quan tâm, hồ sơ mời thầu, hồ sơ yêu cầu đến trước khi ký kết hợp đồng, thỏa thuận khung đối với mua sắm tập trung",
        "Từ ngày có thời điểm đóng thầu đến khi ký kết hợp đồng, thỏa thuận khung đối với mua sắm tập trung",
        "Từ ngày phát hành hồ sơ mời sơ tuyển, hồ sơ mời quan tâm, hồ sơ mời thầu, hồ sơ yêu cầu kể cả sau khi đã ký hợp đồng"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Đối với gói thầu tổ chức lựa chọn nhà thầu qua mạng, trường hợp trong quá trình đánh giá E-HSDT mà chưa có kết quả lựa chọn nhà thầu, nhà thầu có tên trong biên bản mở thầu bị khóa tài khoản theo quy định của pháp luật về đấu thầu thì chủ đầu tư xử lý như thế nào?",
      "options": [
        "Yêu cầu nhà thầu thực hiện các thủ tục để mở khóa tài khoản làm cơ sở xem xét, đánh giá E-HSDT của nhà thầu",
        "Tiếp tục xem xét, đánh giá E-HSDT của nhà thầu",
        "Không tiếp tục xem xét, đánh giá E-HSDT của nhà thầu",
        "Tiếp tục xem xét, đánh giá E-HSDT của nhà thầu và yêu cầu nhà thầu thực hiện các thủ tục để mở khóa tài khoản trước khi phê duyệt kết quả lựa chọn nhà thầu"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với gói thầu xây lắp, dịch vụ phi tư vấn, dịch vụ tư vấn áp dụng đấu thầu trước quy định tại Điều 42 của Luật Đấu thầu, trường hợp dự án được phê duyệt có các nội dung dẫn đến tăng giá gói thầu (hoặc tăng dự toán nếu dự toán được phê duyệt sau khi phê duyệt kế hoạch lựa chọn nhà thầu) từ 30% trở lên hoặc thay đổi tiêu chuẩn đánh giá quan trọng về kỹ thuật hoặc thay đổi cấp công trình quy định trong hồ sơ mời thầu đã phát hành thì chủ đầu tư xử lý như thế nào?",
      "options": [
        "Tiếp tục đánh giá hồ sơ dự thầu trong trường hợp đã mở thầu",
        "Được sửa đổi và phát hành bổ sung hồ sơ mời thầu trong trường hợp chưa mở thầu",
        "Được sửa đổi, bổ sung khối lượng công việc, hoàn thiện để ký kết hợp đồng với nhà thầu",
        "Hủy thầu"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Trường hợp nhà thầu trúng thầu không tiến hành hoàn thiện, ký kết hợp đồng hoặc tại thời điểm ký kết hợp đồng, nhà thầu trúng thầu không đáp ứng yêu cầu về năng lực kỹ thuật, tài chính quy định tại khoản 2 Điều 66 của Luật Đấu thầu thì chủ đầu tư xử lý như thế nào?",
      "options": [
        "Hủy quyết định phê duyệt kết quả lựa chọn nhà thầu trúng thầu",
        "Hủy thầu",
        "Không công nhận kết quả lựa chọn nhà thầu",
        "Đình chỉ cuộc thầu"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Trường hợp nào dưới đây, chủ đầu tư và nhà thầu liên danh được thỏa thuận điều chỉnh phạm vi công việc giữa các thành viên liên danh?",
      "options": [
        "Khi một thành viên liên danh không muốn tiếp tục thực hiện phần việc đã cam kết",
        "Khi chủ đầu tư thấy một thành viên trong liên danh thực hiện tốt nên muốn điều chuyển toàn bộ phần việc cho thành viên liên danh đó",
        "Khi cần đẩy nhanh tiến độ thực hiện hợp đồng hoặc do điều kiện khách quan không phải lỗi của nhà thầu làm ảnh hưởng tiến độ",
        "Khi một thành viên liên danh đề nghị chuyển nhượng phần việc để tiết kiệm chi phí"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đình chỉ cuộc thầu được thực hiện trong thời gian nào?",
      "options": [
        "Từ ngày phát hành hồ sơ mời sơ tuyển, hồ sơ mời quan tâm, hồ sơ mời thầu, hồ sơ yêu cầu đến trước khi ký kết hợp đồng...",
        "Trong quá trình tổ chức lựa chọn nhà thầu cho đến trước khi phê duyệt kết quả lựa chọn nhà thầu",
        "Sau khi phê duyệt kết quả lựa chọn nhà thầu đến khi ký kết hợp đồng...",
        "Trong quá trình thực hiện hợp đồng"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Biện pháp nào sau đây được thực hiện trong quá trình thực hiện hợp đồng?",
      "options": [
        "Hủy thầu",
        "Đình chỉ cuộc thầu",
        "Không công nhận kết quả lựa chọn nhà thầu",
        "Phương án A và B đều đúng"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Thẩm quyền phê duyệt kế hoạch tổng thể lựa chọn nhà thầu thuộc chủ thể nào?",
      "options": [
        "Người có thẩm quyền",
        "Chủ đầu tư (trường hợp xác định được chủ đầu tư)",
        "Người đứng đầu cơ quan được giao chuẩn bị dự án",
        "Bên mời thầu"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Trường hợp thuê đơn vị tư vấn lập hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu, hồ sơ yêu cầu; đánh giá hồ sơ quan tâm, hồ sơ dự sơ tuyển,hồ sơ dự thầu, hồ sơ đề xuất, tổ chuyên gia được thành lập bởi:",
      "options": [
        "Người có thẩm quyền",
        "Chủ đầu tư",
        "Bên mời thầu",
        "Đơn vị tư vấn được chủ đầu tư lựa chọn"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Nhiệm vụ nào sau đây không thuộc trách nhiệm của người có thẩm quyền?",
      "options": [
        "Phê duyệt kế hoạch lựa chọn nhà thầu",
        "Giải quyết kiến nghị và xử lý các vi phạm pháp luật về đấu thầu",
        "Quyết định việc hủy thầu khi thay đổi mục tiêu đầu tư trong quyết định đầu tư",
        "Quyết định việc hủy thầu, đình chỉ cuộc đấu thầu, không công nhận kết quả lựa chọn nhà thầu khi phát hiện có hành vi vi phạm pháp luật về đấu thầu"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Phát hành hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu được thực hiện như thế nào?",
      "options": [
        "Hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu được phát hành sau khi thông báo mời quan tâm, thông báo mời sơ tuyển, thông báo mời thầu được đăng tải thành công trên Hệ thống mạng đấu thầu quốc gia",
        "Hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu được phát hành trước khi với thông báo mời quan tâm, thông báo mời sơ tuyển, thông báo mời thầu",
        "Hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu được phát hành tại thời điểm 03 ngày sau khi thông báo mời quan tâm, thông báo mời sơ tuyển, thông báo mời thầu được đăng tải thành công trên Hệ thống mạng đấu thầu quốc gia",
        "Hồ sơ mời quan tâm, hồ sơ mời sơ tuyển, hồ sơ mời thầu được phát hành đồng thời với thông báo mời quan tâm, thông báo mời sơ tuyển, thông báo mời thầu"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Danh mục hàng hóa, dịch vụ áp dụng mua sắm tập trung do Bộ trưởng Bộ Y tế ban hành:",
      "options": [
        "Danh mục mua sắm tập trung cấp quốc gia đối với ô tô...",
        "Danh mục mua sắm tập trung cấp quốc gia đối với thuốc, danh mục mua sắm tập trung cấp quốc gia đối với thiết bị công nghệ thông tin...",
        "Danh mục mua sắm tập trung cấp quốc gia đối với thuốc, danh mục mua sắm tập trung cấp quốc gia đối với dịch vụ đơn giản...",
        "Danh mục mua sắm tập trung cấp quốc gia đối với thuốc, danh mục mua sắm tập trung cấp quốc gia đối với thiết bị y tế, vật tư xét nghiệm trong trường hợp cần thiết"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Hình thức lựa chọn nhà thầu khi áp dụng mua sắm tập trung bảo hiểm tài sản cho các cơ quan thuộc tỉnh X?",
      "options": [
        "Đấu thầu rộng rãi.",
        "Đấu thầu hạn chế",
        "Đàm phán giá.",
        "Đấu thầu rộng rãi và đàm phán giá"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Đơn vị mua sắm tập trung:",
      "options": [
        "Thực hiện việc lựa chọn nhà thầu trên cơ sở nhiệm vụ được giao",
        "Thực hiện việc lựa chọn nhà thầu trên cơ sở hợp đồng ký với các đơn vị có nhu cầu",
        "Thực hiện việc lựa chọn nhà thầu trên cơ sở nhiệm vụ được giao hoặc hợp đồng ký với các đơn vị có nhu cầu",
        "Không được thực hiện việc lựa chọn nhà thầu"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Thời hạn của thỏa thuận khung:",
      "options": [
        "Thời hạn áp dụng thỏa thuận khung được quy định là 40 tháng",
        "Thời hạn áp dụng thỏa thuận khung được quy định trong kế hoạch lựa chọn nhà thầu nhưng không quá 36 tháng",
        "Thời hạn áp dụng thỏa thuận khung do người có thẩm quyền quyết định trong kế hoạch lựa chọn nhà thầu",
        "Phương án B và C đều đúng"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Tại bước hoàn thiện, ký kết và thực hiện hợp đồng với nhà thầu đối với gói thầu mua sắm tập trung:",
      "options": [
        "Nhà thầu đã ký kết thỏa thuận khung phải thực hiện biện pháp bảo đảm thực hiện hợp đồng trước hoặc cùng thời điểm hợp đồng có hiệu lực cho đơn vị mua sắm tập trung",
        "Nhà thầu đã ký kết thỏa thuận khung phải thực hiện biện pháp bảo đảm thực hiện hợp đồng trước hoặc cùng thời điểm hợp đồng có hiệu lực cho đơn vị có nhu cầu mua sắm",
        "Nhà thầu đã ký kết thỏa thuận khung không phải thực hiện biện pháp bảo đảm thực hiện hợp đồng trước thời điểm hợp đồng có hiệu lực cho đơn vị có nhu cầu mua sắm",
        "Nhà thầu đã ký kết thỏa thuận khung phải thực hiện biện pháp bảo đảm thực hiện hợp đồng sau thời điểm hợp đồng có hiệu lực cho đơn vị mua sắm tập trung"
      ],
      "correctAnswer": 1
    },
    {
      "question": "Đối với các gói thầu mua sắm tập trung, trách nhiệm cung cấp thông tin về kết quả thực hiện hợp đồng của nhà thầu do ai thực hiện?",
      "options": [
        "Đơn vị có nhu cầu mua sắm",
        "Bên mời thầu",
        "Đơn vị tư vấn được thuê làm bên mời thầu",
        "Không phải đăng tải thông tin"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Áp dụng hình thức lựa chọn nhà thầu nào khi mua sắm tập trung đối với gói thầu điều hòa không khí thông dụng, sẵn có trên thị trường, có giá gói thầu là 03 tỷ đồng cho các cơ quan thuộc tỉnh X?",
      "options": [
        "Đấu thầu rộng rãi hoặc mua sắm trực tiếp",
        "Đấu thầu rộng rãi hoặc chỉ định thầu theo hạn mức",
        "Đấu thầu rộng rãi hoặc chào hàng cạnh tranh",
        "Đấu thầu rộng rãi hoặc chỉ định thầu hoặc đàm phán giá"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Trách nhiệm trong mua sắm tập trung:",
      "options": [
        "Đơn vị mua sắm tập trung thực hiện trách nhiệm của người có thẩm quyền theo quy định của Luật Đấu thầu",
        "Đơn vị mua sắm tập trung thực hiện trách nhiệm của chủ đầu tư quy định của Luật Đấu thầu",
        "Đơn vị mua sắm tập trung thực hiện trách nhiệm của bên mời thầu quy định của Luật Đấu thầu",
        "Đơn vị mua sắm tập trung thực hiện trách nhiệm của tổ chuyên gia theo quy định của Luật Đấu thầu"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Nhà thầu đã ký thỏa thuận khung và được đơn vị có nhu cầu mua sắm yêu cầu ký hợp đồng nhưng không ký hợp đồng, không thực hiện biện pháp bảo đảm thực hiện hợp đồng sẽ bị xử lý như thế nào?",
      "options": [
        "Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 06 tháng kể từ ngày đơn vị có nhu cầu mua sắm công khai tên nhà thầu trên Hệ thống...",
        "Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 06 tháng kể từ ngày đơn vị mua sắm tập trung công khai tên nhà thầu trên Hệ thống mạng đấu thầu quốc gia, trừ trường hợp bất khả kháng",
        "Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 03 tháng kể từ ngày Bộ Tài chính nhận được văn bản đề nghị của đơn vị có nhu cầu mua sắm...",
        "Nhà thầu sẽ bị khóa tài khoản trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 06 tháng kể từ ngày Bộ Tài chính nhận được văn bản đề nghị của đơn vị có nhu cầu mua sắm..."
      ],
      "correctAnswer": 1
    },
    {
      "question": "Đối với gói thầu mua sắm tập trung áp dụng lựa chọn nhà thầu căn cứ theo khả năng cung cấp và áp dụng phương pháp giá thấp nhất, việc lựa chọn danh sách nhà thầu trúng thầu được thực hiện như thế nào?",
      "options": [
        "Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu tối thiểu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đề nghị trúng thầu của gói thầu tốt nhất",
        "Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đề nghị trúng thầu của gói thầu cao nhất",
        "Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu tối thiểu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đề nghị trúng thầu của gói thầu thấp nhất",
        "Phải đảm bảo tổng số lượng hàng hóa mà các nhà thầu trúng thầu chào thầu bằng số lượng hàng hóa nêu trong hồ sơ mời thầu, đồng thời bảo đảm tổng giá đánh giá của gói thầu là thấp nhất"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Đối với gói thầu mua sắm tập trung áp dụng lựa chọn nhà thầu căn cứ khối lượng mời thầu, danh sách phê duyệt nhà thầu trúng thầu bao gồm:",
      "options": [
        "Danh sách chính (nhà thầu xếp thứ nhất) và danh sách dự bị (nhà thầu xếp thứ 2 trở đi)",
        "Danh sách chính (nhà thầu xếp thứ nhất) và danh sách nhà thầu không đáp ứng yêu cầu của hồ sơ mời thầu",
        "Danh sách các nhà thầu đáp ứng yêu cầu về năng lực và kinh nghiệm theo yêu cầu của hồ sơ mới thầu",
        "Danh sách chính (nhà thầu xếp thứ nhất và nhà thầu xếp thứ 2) và danh sách dự bị (nhà thầu xếp thứ 3 trở đi)"
      ],
      "correctAnswer": 0
    },
    {
      "question": "Thời gian có hiệu lực thi hành của Luật số 90/2025/QH15?",
      "options": [
        "Từ ngày 01 tháng 7 năm 2025",
        "Từ ngày 04 tháng 8 năm 2025",
        "Từ ngày 08 tháng 8 năm 2025",
        "Tất cả các đáp án trên đều sai"
      ],
      "correctAnswer": 0
    }
  ]
},
        
    exam4: {
        title: "Đề 4",
        description: "Đề bài gồm 60 câu, thời gian làm bài 120 phút!",
         questions: [
            { question: "Dòng sông nào dài nhất thế giới?", options: ["Sông Nile", "Sông Amazon", "Sông Mississippi", "Sông Dương Tử"], correctAnswer: 0 },
        ]
    },
    exam5: {
        title: "Đề 5",
        description: "Đề bài gồm 60 câu, thời gian làm bài 120 phút!",
        questions: [
            { question: "Ai là tác giả của tác phẩm 'Số Đỏ'?", options: ["Nam Cao", "Ngô Tất Tố", "Vũ Trọng Phụng", "Nguyễn Công Hoan"], correctAnswer: 2 },
        ]
    }
};

// --- BIẾN TRẠNG THÁI ---
let userAnswers = {};
let timerInterval;
let currentQuizId = null;
let currentQuestions = [];

// --- DOM ELEMENTS ---
const screens = {
    loading: document.getElementById('loading-screen'),
    auth: document.getElementById('auth-screen'),
    main: document.getElementById('main-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    review: document.getElementById('review-screen')
};
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authError = document.getElementById('auth-error');
const loginTabBtn = document.getElementById('login-tab-btn');
const registerTabBtn = document.getElementById('register-tab-btn');
const logoutBtn = document.getElementById('logout-btn');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const submitQuizBtn = document.getElementById('submit-quiz-btn');
const quizSelectionContainer = document.getElementById('quiz-selection-container');
const resultsListContainer = document.getElementById('results-list');
const backFromReviewBtn = document.getElementById('back-from-review-btn');
const deleteHistoryBtn = document.getElementById('delete-history-btn');

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    if (screens[screenName]) screens[screenName].classList.remove('hidden');
}

// --- AUTH LOGIC ---
onAuthStateChanged(auth, async (user) => {
    screens.loading.classList.add('hidden');
    if (user) {
        document.getElementById('user-email').textContent = user.email;
        renderQuizSelection();
        await loadPastResults(user.uid);
        showScreen('main');
    } else {
        showScreen('auth');
    }
});

// --- QUIZ LOGIC ---

function renderQuizSelection() {
    quizSelectionContainer.innerHTML = '';
    for (const quizId in allQuizzes) {
        const quiz = allQuizzes[quizId];
        const card = document.createElement('div');
        card.className = 'card-tech rounded-lg p-6 flex flex-col items-center text-center cursor-pointer';
        card.innerHTML = `
            <h3 class="text-xl font-bold text-gray-800 mb-2">${quiz.title}</h3>
            <p class="text-gray-600 mb-4 flex-grow">${quiz.description}</p>
            <button data-quiz-id="${quizId}" class="start-quiz-btn w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition">Bắt đầu</button>
        `;
        quizSelectionContainer.appendChild(card);
    }
}

quizSelectionContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('start-quiz-btn')) {
        const quizId = e.target.dataset.quizId;
        startQuiz(quizId);
    }
});

function startQuiz(quizId) {
    currentQuizId = quizId;
    currentQuestions = allQuizzes[quizId].questions;
    if(currentQuestions.length > 10) currentQuestions = currentQuestions.slice(0, 60);

    userAnswers = {};
    renderQuiz();
    showScreen('quiz');
    const quizDuration = 60 * 100;
    startTimer(quizDuration, document.getElementById('timer'));
}

async function submitQuiz() {
    clearInterval(timerInterval);
    let correct = 0, incorrect = 0, unanswered = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
        if (userAnswers[i] && userAnswers[i].answer !== undefined) {
            if (userAnswers[i].answer === currentQuestions[i].correctAnswer) correct++;
            else incorrect++;
        } else unanswered++;
    }
    
    const user = auth.currentUser;
    if (user) {
        try {
            await addDoc(collection(db, "quizResults"), {
                userId: user.uid,
                quizId: currentQuizId,
                quizTitle: allQuizzes[currentQuizId].title,
                score: correct,
                totalQuestions: currentQuestions.length,
                timestamp: serverTimestamp(),
                questions: currentQuestions,
                userAnswers: userAnswers
            });
        } catch (error) { console.error("Error saving result: ", error); }
    }
    displayResults(correct, incorrect, unanswered);
}

function displayResults(correct, incorrect, unanswered) {
    const total = currentQuestions.length;
    const score = total > 0 ? (correct / total) * 100 : 0;
    document.getElementById('score-text').textContent = `${correct}/${total}`;
    document.getElementById('correct-answers').textContent = correct;
    document.getElementById('incorrect-answers').textContent = incorrect;
    document.getElementById('unanswered-questions').textContent = unanswered;
    const progressCircle = document.getElementById('progress-circle');
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference - score / 100 * circumference;
    
    renderResultDetails(currentQuestions, userAnswers);
    showScreen('result');
}

async function loadPastResults(userId) {
    const resultsContainer = document.getElementById('results-list');
    const noResultsText = document.getElementById('no-results-text');
    const deleteBtn = document.getElementById('delete-history-btn');
    resultsContainer.innerHTML = '';
    try {
        const q = query(collection(db, "quizResults"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            noResultsText.style.display = 'block';
            deleteBtn.classList.add('hidden');
        } else {
            noResultsText.style.display = 'none';
            deleteBtn.classList.remove('hidden');
            
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });

            results.sort((a, b) => {
                if (!a.timestamp) return 1;
                if (!b.timestamp) return -1;
                return b.timestamp.toMillis() - a.timestamp.toMillis();
            });
            
            results.forEach((data) => {
                const date = data.timestamp ? data.timestamp.toDate().toLocaleString('vi-VN') : 'N/A';
                const resultElement = document.createElement('div');
                resultElement.className = 'flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0';
                resultElement.innerHTML = `
                    <div>
                        <p class="font-semibold text-gray-800">${data.quizTitle || 'Bài kiểm tra'}</p>
                        <p class="text-sm text-gray-500">Ngày làm: ${date}</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="text-right">
                           <p class="font-bold text-lg text-gray-800">${data.score}/${data.totalQuestions}</p>
                           <p class="font-semibold text-sm ${data.score/data.totalQuestions >= 0.5 ? 'text-green-600' : 'text-red-600'}">
                               ${((data.score/data.totalQuestions)*100).toFixed(0)}%
                           </p>
                        </div>
                        <button data-result-id="${data.id}" class="review-btn bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition">Xem lại</button>
                    </div>
                `;
                resultsContainer.appendChild(resultElement);
            });
        }
    } catch (error) {
        console.error("Error loading past results: ", error);
        noResultsText.textContent = "Lỗi tải lịch sử. Vui lòng kiểm tra console.";
        noResultsText.style.display = 'block';
    }
}

backToHomeBtn.addEventListener('click', async () => {
    if (auth.currentUser) await loadPastResults(auth.currentUser.uid);
    showScreen('main');
});
function renderQuiz() {
    const questionsContainer = document.getElementById('questions-container');
    const questionNav = document.getElementById('question-nav');
    questionsContainer.innerHTML = '';
    questionNav.innerHTML = '';

    currentQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.id = `question-${index}`;
        questionElement.className = 'mb-8 p-6 border-b border-gray-200 last:border-b-0';
        
        let optionsHTML = q.options.map((opt, optIndex) => `
            <label class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100/50 transition-colors">
                <input type="radio" name="q_${index}" value="${optIndex}" class="form-radio h-5 w-5 border-gray-300 text-[#2c5282] focus:ring-[#2c5282]">
                <span class="text-gray-700">${opt}</span>
            </label>
        `).join('');

        questionElement.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h4 class="text-lg font-semibold text-gray-800"><span class="glow-text">Câu ${index + 1}:</span> ${q.question}</h4>
                <button class="flag-btn p-2 rounded-full hover:bg-yellow-400/20" data-index="${index}">
                    <svg class="w-6 h-6 text-gray-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                </button>
            </div>
            <div class="space-y-2 mt-4">${optionsHTML}</div>
        `;
        questionsContainer.appendChild(questionElement);

        const navBtn = document.createElement('button');
        navBtn.id = `nav-btn-${index}`;
        navBtn.className = 'w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 text-gray-500 font-semibold transition-colors';
        navBtn.textContent = index + 1;
        navBtn.addEventListener('click', () => {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        questionNav.appendChild(navBtn);
    });
    
    questionsContainer.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            const questionIndex = parseInt(e.target.name.split('_')[1]);
            if(!userAnswers[questionIndex]) userAnswers[questionIndex] = {};
            userAnswers[questionIndex].answer = parseInt(e.target.value);
            updateNavButton(questionIndex);
        }
    });

    questionsContainer.addEventListener('click', (e) => {
        const flagBtn = e.target.closest('.flag-btn');
        if (flagBtn) {
            const questionIndex = parseInt(flagBtn.dataset.index);
            if(!userAnswers[questionIndex]) userAnswers[questionIndex] = {};
            userAnswers[questionIndex].flagged = !userAnswers[questionIndex].flagged;
            flagBtn.querySelector('svg').classList.toggle('text-yellow-500', userAnswers[questionIndex].flagged);
            flagBtn.querySelector('svg').classList.toggle('text-gray-400', !userAnswers[questionIndex].flagged);
            updateNavButton(questionIndex);
        }
    });
}

function updateNavButton(index) {
    const navBtn = document.getElementById(`nav-btn-${index}`);
    const state = userAnswers[index];
    navBtn.className = 'w-10 h-10 flex items-center justify-center rounded-lg border-2 font-semibold transition-colors ';
    if (state && state.flagged) navBtn.classList.add('bg-yellow-400', 'border-yellow-500', 'text-black');
    else if (state && state.answer !== undefined) navBtn.classList.add('bg-green-500', 'border-green-600', 'text-white');
    else navBtn.classList.add('bg-white', 'border-gray-300', 'text-gray-500');
}

function startTimer(duration, display) {
    let timer = duration;
    timerInterval = setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

async function renderReview(resultId) {
    try {
        const docRef = doc(db, "quizResults", resultId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const reviewContent = document.getElementById('review-content');
            const reviewTitle = document.getElementById('review-title');
            reviewContent.innerHTML = '';
            reviewTitle.textContent = `Xem Lại: ${data.quizTitle}`;
            
            const questions = data.questions || [];
            const userAnswersData = data.userAnswers || {};

            questions.forEach((q, index) => {
                const questionElement = renderResultQuestion(q, index, userAnswersData);
                reviewContent.appendChild(questionElement);
            });
            showScreen('review');

        } else { alert("Không tìm thấy kết quả bài làm."); }
    } catch (error) {
        console.error("Error getting document:", error);
        alert("Đã xảy ra lỗi khi tải chi tiết bài làm.");
    }
}

function renderResultDetails(questions, userAnswersData){
    const container = document.getElementById('result-details-container');
    container.innerHTML = '';
    questions.forEach((q, index) => {
        const questionElement = renderResultQuestion(q, index, userAnswersData);
        container.appendChild(questionElement);
    });
}

function renderResultQuestion(q, index, userAnswersData) {
    const userAnswerInfo = userAnswersData[index];
    const userAnswerIndex = userAnswerInfo ? userAnswerInfo.answer : undefined;
    
    let optionsHTML = q.options.map((opt, optIndex) => {
        let optionClasses = "flex items-center space-x-3 p-3 rounded-lg border";
        if (optIndex === q.correctAnswer) {
            optionClasses += " bg-green-100 border-green-300";
        } else if (optIndex === userAnswerIndex) {
            optionClasses += " bg-red-100 border-red-300";
        } else {
            optionClasses += " border-gray-200";
        }

        return `
            <div class="${optionClasses}">
                <input type="radio" name="review_q_${index}" value="${optIndex}" class="form-radio h-5 w-5 border-gray-300" ${userAnswerIndex === optIndex ? 'checked' : ''} disabled>
                <span class="text-gray-800">${opt}</span>
            </div>
        `;
    }).join('');

    const questionElement = document.createElement('div');
    questionElement.className = 'p-4 border-b border-gray-200 last:border-b-0';
    questionElement.innerHTML = `
        <h4 class="text-lg font-semibold text-gray-800 mb-4"><span class="glow-text">Câu ${index + 1}:</span> ${q.question}</h4>
        <div class="space-y-2 mt-2">${optionsHTML}</div>
    `;
    return questionElement;
}

async function deleteAllHistory(userId) {
    if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm bài không? Hành động này không thể hoàn tác.')) {
        return;
    }
    deleteHistoryBtn.disabled = true;
    deleteHistoryBtn.textContent = 'Đang xóa...';
    try {
        const q = query(collection(db, "quizResults"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        await loadPastResults(userId); // Refresh the list
    } catch (error) {
        console.error("Error deleting history: ", error);
        alert('Đã xảy ra lỗi khi xóa lịch sử. Vui lòng kiểm tra lại quy tắc bảo mật (Security Rules) trong Firebase và cấp quyền "delete".');
    } finally {
        deleteHistoryBtn.disabled = false;
        deleteHistoryBtn.textContent = 'Xóa Tất Cả';
    }
}

deleteHistoryBtn.addEventListener('click', () => {
    if (auth.currentUser) {
        deleteAllHistory(auth.currentUser.uid);
    }
});

resultsListContainer.addEventListener('click', (e) => {
    const reviewBtn = e.target.closest('.review-btn');
    if (reviewBtn) {
        const resultId = reviewBtn.dataset.resultId;
        renderReview(resultId);
    }
});

backFromReviewBtn.addEventListener('click', () => showScreen('main'));

submitQuizBtn.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn nộp bài không?')) submitQuiz();
});

loginTabBtn.addEventListener('click', () => {
    loginTabBtn.classList.add('border-[#2c5282]', 'text-[#2c5282]');
    loginTabBtn.classList.remove('border-transparent', 'text-gray-500');
    registerTabBtn.classList.remove('border-[#2c5282]', 'text-[#2c5282]');
    registerTabBtn.classList.add('border-transparent', 'text-gray-500');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    authError.textContent = '';
});
registerTabBtn.addEventListener('click', () => {
    registerTabBtn.classList.add('border-[#2c5282]', 'text-[#2c5282]');
    registerTabBtn.classList.remove('border-transparent', 'text-gray-500');
    loginTabBtn.classList.remove('border-[#2c5282]', 'text-[#2c5282]');
    loginTabBtn.classList.add('border-transparent', 'text-gray-500');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    authError.textContent = '';
});
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    try { await createUserWithEmailAndPassword(auth, email, password); } 
    catch (error) { authError.textContent = "Lỗi đăng ký: " + error.code; }
});
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try { await signInWithEmailAndPassword(auth, email, password); }
    catch (error) { authError.textContent = "Lỗi đăng nhập: " + error.code; }
});
logoutBtn.addEventListener('click', () => signOut(auth));
