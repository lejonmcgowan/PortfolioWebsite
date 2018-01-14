count=1
water="water"
extension=".jpeg"

for file in *jpeg
do
  mv "$file" "$water$count$extension"
  count=$((count+1))
done
