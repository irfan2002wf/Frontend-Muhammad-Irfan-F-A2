const { createApp, ref, onMounted } = Vue;

const app = createApp({
    setup() {
        const url = "http://localhost:7000/music";

        const music = ref({
            id: null,
            judul : "",
            artis : "",
            album : "",
            date  : "",
            list: [],
            errorMessage: "",
            isError: false,
            isUpdate: false,
        });

        // get semua data
        const getMusic = async () => {
            try {
                music.value.isUpdate = false;
                const resMusic = await axios.get(url);

                if (resMusic.data.length === 0)
                throw new Error("Music gak ada");

                music.value.list = resMusic.data;

                return resMusic.data;

            } catch (err) {
                music.value.isError = true;
                music.value.errorMessage = err.message;
                music.value.isUpdate = false;
            }
        };

        // get data dari id
        const getMusicById = async (id) => {
            try {
                const resMusic = await axios.get(url + `/${id}`);

                if (resMusic.data.length === 0)
                throw new Error("Music gak ada");

                music.value.isUpdate = true;
                music.value.id = id;
                music.value.judul = resMusic.data.judul;
                music.value.artis = resMusic.data.artis;
                music.value.album = resMusic.data.album;
                music.value.date = resMusic.data.date;

                return resMusic.data;

            } catch (err) {
                music.value.judul = "";
                music.value.artis = "";
                music.value.album = "";
                music.value.date = "";
                music.value.isUpdate = false;
                music.value.isError = true;
                music.value.errorMessage = err.message;
            }
        };

        // submit
        const submitMusic = async () => {
            try {
                music.value.isUpdate = false;
                const post = await axios.post(url + "/create", {

                judul: music.value.judul,
                artis: music.value.artis,
                album: music.value.album,
                date: music.value.date,

                });

                music.value.isError = false;
                music.value.judul = "";
                music.value.artis = "";
                music.value.album = "";
                music.value.date = "";
                music.value.isUpdate = false;

                if (!post) throw new Error("Gagal membuat music");
                await getMusic();

            } catch (err) {
                music.value.isError = true;
                music.value.errorMessage = err.message;
            }
        };

        // update
        const updateMusic = async () => {
            try {
                music.value.isUpdate = true;
                const put = await axios.put(url + "/update", {

                id: music.value.id,
                judul: music.value.judul,
                artis: music.value.artis,
                album: music.value.album,
                date: music.value.date,

                });
                music.value.isError = false;
                music.value.judul = "";
                music.value.artis = "";
                music.value.album = "";
                music.value.date = "";
                music.value.isUpdate = false;
                music.value.isError = true;

                if (!put) throw new Error("Gagal mengapdate music");
                await getMusic();
                
            } catch (err) {
                music.value.isUpdate = false;
                music.value.isError = true;
                music.value.errorMessage = err.message;
            }
        };

        // hapus
        const deleteMusic = async (id) => {
            try {
                music.value.isUpdate = false;

                const resMusic = await axios.delete(url + "/delete", {
                data: {
                    id,
                    },
                });

                if (resMusic.data.length === 0)
                throw new Error("Music gak ada");

                music.value.list = resMusic.data;

                await getMusic();
                return resMusic.data;
            } catch (err) {
                music.value.isError = true;
                music.value.errorMessage = err.message;
            }
        };

        onMounted(async () => {
            await getMusic();
        });

        return {
            music,
            submitMusic,
            updateMusic,
            deleteMusic,
            getMusicById,
        };

    },
});

app.mount("#app");