import jwt from 'jsonwebtoken'

export const generateToken = (uid) => {
    const expiresIn = 1000 * 60 * 15;
    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn };

    } catch (e) {
        console.log(e);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 30;
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: !(process.env.MODO === "developer"),
        expires: new Date(Date.now() + expiresIn),
    })
};