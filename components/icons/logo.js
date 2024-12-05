import { useTheme } from 'next-themes'

const Logo = () => {
  const { theme } = useTheme()

  return (
    <svg
      version="1.1"
      viewBox="500 500 1000 1000"
      width="30"
      height="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Switch the fill color based on the theme */}
      <path
        transform="translate(1548,716)"
        d="m0 0h4l-1 6-11 22-15 35-8 17-14 32-16 36-10 22-7 15-15 34-13 29-12 27-9 20-16 35-13 29-28 63-13 29-16 35-14 32-18 41-18 40-4 9-2 6-16 1h-126l-6-2-7-6-7-12-7-16-9-19-9-20-30-60-16-36-13-25-13-29-8-16-14-29-11-23-8-16-13-28-8-16-11-23-8-16-10-15-8-10-5-4-5-5-12-10-21-14-19-9-22-6-18-3h-31l-21 3-24 7-17 8-13 8-15 10-13 11-9 10-10 14-11 21-9 23-3 12-2 23v194l-2 62-3 16-4 10-9 14-11 11-13 8-14 5-10 2h-18l-16-4-14-7-10-8-9-10-6-10-5-12-3-15v-193l1-71 2-26 4-22 6-23 10-27 10-22 12-22 16-23 9-12 12-13 22-22 11-9 17-13 15-10 22-12 14-7 23-9 27-8 19-5 18-2 18-1h45l23 2 30 7 27 9 24 11 25 13 18 12 15 11 13 11 12 11 13 13 7 8 11 14 14 20 11 18 9 17 13 29 10 22 9 21 16 35 15 32 11 26 16 35 16 36 8 17 7 11 5-9 4-5 5-13 12-26 4-10 8-17 4-11 6-13 16-36 10-24 9-21 6-12 12-28 13-30 26-58 9-20 11-26 9-20 8-14 8-10 5-6 8-7 11-8 18-10 15-5 15-2z"
        fill={theme === 'light' ? '#000000' : '#FDFDFD'} // Set the fill color based on theme
      />
    </svg>
  )
}

export default Logo
